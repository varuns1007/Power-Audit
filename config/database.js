const mongoose = require("mongoose");
require('dotenv').config({ path: 'env' });

// mongoose.set("debug",true);

module.exports = () => {
    mongoose
        .connect(process.env.DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('Mongodb Connected...');
        })
        .catch(err => console.log(err.message));
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db..');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(
                'Mongoose connection is disconnected due to app termination...'
            );
            process.exit(0);
        });
    });
};
