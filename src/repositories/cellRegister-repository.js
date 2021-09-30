const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

exports.register = async(data) => {
    return await new Phone(data).save();
}

