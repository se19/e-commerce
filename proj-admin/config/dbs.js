const mongoose = require('mongoose');

const conn_str = "mongodb+srv://admin:123@cluster0-llp1b.mongodb.net/shopDB?retryWrites=true";
//const conn_str = "mongodb://localhost:27017/webshopdb?retryWrites=true";

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const connect = (conn_str) => {
    return mongoose.connect(conn_str, {
            useNewUrlParser: true
        })
        .then(result => {
            // console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.initdb = async () => {
    await connect(conn_str);
};