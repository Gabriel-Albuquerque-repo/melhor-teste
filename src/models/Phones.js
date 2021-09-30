const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const repeat = {
    type: String,
    set: v => v.replaceAll(' ', ''),
    trim: true,
    minLength: [2, 'Must be at least 2 valid character, got {VALUE}.'],
    maxLength: [255, 'Must have a maximum of 255 valid characters, got {VALUE}.'],
    match: [/^[(A-Za-z0-9)]*$/, 'Only alphanumereric characters are allowed.'], 
}

const cell = new Schema({
    model: repeat,
    price: {
        type: Number,
        min: [0.1, 'Must be a positive number and bigger then 0.'] 
    },
    brand: repeat,
    startDate: {
        type: Date,
        min: '2018-12-25',
    },
    endDate: {
        type: Date,
    },
    color: {
        type: String,
        enum: {
            values: ['BLACK', 'WHITE', 'GOLD', 'PINK'],
            message: '{VALUE} is not a option.'
        }
    },
    code: {
        type: String,
        minLength: 8,
        maxLength: 8,
        unique: true
    }
})

module.exports = mongoose.model('Phone', cell, 'cellPhones');

