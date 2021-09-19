const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const countriesListJson = require('./data.json')

const port = process.env.PORT || 400;

const connection = async()=>{
    if(process.env.NODE_ENV == 'test'){
        //setting mock database for unit testing
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(() => 
        mongoose.connect('mongodb+srv://akash:12345@cluster0.hf7eb.mongodb.net/unit-testing?retryWrites=true&w=majority',{
            useNewUrlparser: true,
            useUnifiedTopology: true
        }).then((db)=>{
            console.log('sucessfully connected to test database');
        }).catch((err)=> console.error('Error while connecting to db due to : ' + err)));

    }else{
        mongoose.connect('mongodb+srv://akash:12345@cluster0.hf7eb.mongodb.net/employee?retryWrites=true&w=majority',{
            useNewUrlparser: true,
            useUnifiedTopology: true
        }).then((db)=>{
            // first time collection countrieslist setup
            // db.connection.collection('countrieslists').insertMany(countriesListJson, (error, inserted)=>{
            //     if(error) {
            //         console.error(error);
            //     }
            //     else {
            //         console.log("Successfully inserted: " , inserted );
            //     }
            // })
        // console.log('sucessfully connected to database');
        console.log(`server is running on port : ${port}`);
        }).catch((err)=> console.error('Error while connecting to db due to : ' + err));
    }
}

module.exports = connection;