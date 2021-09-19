const mongoose = require('mongoose')

const countriesListSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    nativeName: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: false,
    }
});

const countriesList = new mongoose.model('countriesList', countriesListSchema)

module.exports = countriesList;