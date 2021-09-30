const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');


exports.update = async(oldData, newData) => {
    return await Phone.findOneAndUpdate(oldData, newData);
}