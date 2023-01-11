const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');
const db = mongoose.connection;
db.on('error', function(error){
    console.log(error);
});
db.on('open', function(){
    console.log("DB Connected");
});

module.exports = db;