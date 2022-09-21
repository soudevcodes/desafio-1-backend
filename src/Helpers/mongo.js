const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

console.log(mongoString);

const connect = async () => {
    await mongoose.connect(mongoString);
    const database = await mongoose.connection;
    
    database.on('error', (error) => {
        console.log(error)
    });
    
    database.once('connected', () => {
        console.log('Database Connected');
    });
};

module.exports = {
    connect,
}