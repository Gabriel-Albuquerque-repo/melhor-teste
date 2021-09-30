const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Lost connection with mongoDB server.');
});

process.on('SIGINT', async () => {
    try{
        await db.close();
        console.log('Mongoose default connection is disconnected due to application termination')
        } catch(e){
            console.log(e);
        }
        return process.exit(0);
    });

module.exports = db;
