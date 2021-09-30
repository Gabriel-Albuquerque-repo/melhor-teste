const mongoose = require('mongoose');
const Phones = mongoose.model('Phone');

//Listar somente os nomes ou todas as informações?
exports.list = async () => {
    return await Phones.find({}).select('-__v');
};