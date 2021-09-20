const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

//const countriesListJson = require('./database/data.json')
const connection = require('./database/connection');
const addedCountries = require('./database/models/AddedCountry');
const countriesList = require('./database/models/CountryList');
const app = express();

//logging perspective
app.use(morgan('tiny'));

//Dynamic Port by hosted server
const port = process.env.PORT || 400;

//body json/url encoded parser
var urlEncodedParser = bodyparser.urlencoded({ extended: false });

// for html template
const staicPath = path.join(__dirname, '../public');
app.use(express.static(staicPath));

// for handlebar template engine
app.set('view engine', 'hbs');

//home page
app.get('/', async (req, res) => {
  try {
    let countries = await countriesList.find();
    res.render('index', { countriesList: countries });
  } catch (err) {
    console.error(err);
    res.status(500).render('error');
  }
});

//submit page, create new country in our database
app.post('/country', urlEncodedParser, async (req, res) => {
  try {
    //console.log(req.body);
    const newAddedCountry = new addedCountries({
      id: req.body.id,
      code: req.body.code,
      name: req.body.name,
      nativeName: req.body.nativeName,
      class: req.body.class,
    });
    let name = req.body.name;
    if (!name || name == '') {
      console.error('invalid request');
      return res.redirect('/');
    }
    await newAddedCountry.save();
    req.body.name = '';
    return res.status(201).render('success', { data: name });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'something went wrong!' });
  }
});

//intial json data
app.get('/countriesList', async (req, res) => {
  try {
    let countries = await countriesList.find();
    res.send(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send('something went wrong');
  }
});

// initializing database connection
connection();

//initializing server port
app.listen(port, () => {
  //console.log(`server is running on port : ${port}`);
});

module.exports = app;
