const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

exports.delete = async(data) => {
    return await Phone.findOneAndDelete({code: data})
}