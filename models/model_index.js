const DBConfig = require("../config/config_db.js");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.pluralize(null);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = DBConfig.url;

/***
START of Model declaration
***/

db.citizen = require("./model_citizen.js")(mongoose, mongoosePaginate);

/***
END of Model declaration
***/

module.exports = db;