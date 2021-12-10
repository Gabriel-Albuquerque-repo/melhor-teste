const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

// Procurar pelo id ou code?
exports.see = async(data) => {
    return await Phone.findOne({ code: data }).select('_id model');
}