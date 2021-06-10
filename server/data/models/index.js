import Mongoose from 'mongoose';
import Chalk from 'chalk';
import config from '../../config/config';

var dbURL =  config.database.dburl+config.database.dbname  ;

var connected = Chalk.bold.cyan;
var error = Chalk.bold.yellow;
var disconnected = Chalk.bold.red;
var termination = Chalk.bold.magenta;

export default function(){

    Mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true });

    Mongoose.connection.on('connected', () => {
        console.log(connected("Mongoose connection is open to ", dbURL));
    });

    Mongoose.connection.on('error', (err) => {
        console.log(error("Mongoose connection has occured "+err+" error"));
    });

    Mongoose.connection.on('disconnected', () => {
        console.log(disconnected("Mongoose connection is disconnected"));
    });

    Mongoose.connection.on("reconnected", err => {
        console.log(`MongoDB reconnection success @ ${dbURL}`);
    });

    process.on('SIGINT', () => {
        Mongoose.connection.close(() => {
            console.log(termination("Mongoose connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}