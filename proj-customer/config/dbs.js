const mongoose = require('mongoose');

const conn_str = "mongodb+srv://admin:123@cluster0-llp1b.mongodb.net/shop?retryWrites=true";

mongoose.set('useCreateIndex', true);

const connect = (conn_str) => {
    return mongoose.connect(conn_str, {
            useNewUrlParser: true
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.initdb = async () => {
    await connect(conn_str);
};