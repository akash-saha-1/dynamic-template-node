const mongoose = require('mongoose')

const addedCountrySchema = new mongoose.Schema({
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

const addedCountries = new mongoose.model('addedCountries', addedCountrySchema)

module.exports = addedCountries;