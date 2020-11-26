const express = require("express");
const cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false }))

const db = require("./models/model_index");
db.mongoose
  .connect( db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the MongoDB.");
  })
  .catch(err => {
    console.log("Cannot connect to the MongoDB.", err);
    process.exit();
  });

require('dotenv').config()
require("./routes/route_index")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
