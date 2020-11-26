const db = require("../models/model_index");
const DBModel = db.citizen;

// Create request
exports.create = (req, res) => {

  // Simple Validation 
  if (!req.body.firstname && !req.body.middlename && !req.body.lastname) {
    res.status(400).send({
      return_code : 2 ,
      message: "Invalid request!"
    });
    return;
  }

  const citizen = new DBModel ({
    qr_no : req.body.qr_no ,
    firstname : req.body.firstname ,
    middlename : req.body.middlename ,
    lastname : req.body.lastname , 
    mobile_no : req.body.mobile_no ,
    email_address : req.body.email_address ,
    home_address : req.body.home_address ,
    barangay : req.body.barangay ,
    city : req.body.city ,
    age : req.body.age ,
    sex : req.body.sex ,
    status : '0' ,
  });

  citizen
    .save(citizen)
    .then(response => {
      res.status(201).send({
        return_code : 1 ,
        message : "New data added!",
        details : response
      });
    })
    .catch(err => {
      res.status(500).send({ 
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
    });
};


// Get all request
exports.getAll = (req, res) => {
  const { page, limit } = req.query;
  const options = {
    page: +page,
    limit: +limit,
  }

  DBModel.paginate({}, options)
    .then(response => {
      res.status(200).send({
        return_code : 0 ,
        message : "Valid request." ,
        "details": response
      });
    })
    .catch(err => {
      res.status(500).send({ 
        return_code : 4 ,
        message: err.message || "Some error occurred."
    });
  });
};


// Get request by ID
exports.getOne = (req, res) => {
  const { id } = req.params;

  DBModel.findById(id)
    .then(response => {
      res.status(200).send({
        return_code : 0 ,
        message : "Valid request." ,
        details : response
      });
    })
    .catch(err => {
      res.status(500).send({ 
        return_code : 4 ,
        message: err.message || "Some error occurred."
    });
  });
};

// Get specific request
exports.getCity = (req, res) => {
  const {city} = req.params;
  const { page, limit } = req.query;
  const options = {
    page: +page,
    limit: +limit
  }
  DBModel.paginate({ city: { $regex: new RegExp(city) } }, options)
    .then(response => {
      res.status(200).send({
        return_code : 0 ,
        message : "Valid request." ,
        details : response
      });
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
  });
};


// Update request
exports.updateOne = (req, res) => {
  const id = req.params.id;

  DBModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(response => {
      if (!response) {
        res.status(404).send({
          return_code : 3 ,
          message: "Data not found."
        });
      } else {
        res.status(200).send({
          return_code : 0 ,
          message: "Data was updated successfully."
        });
      } 
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
  });
};


// Delete request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(response => {
      if (!response) {
        res.status(404).send({
          return_code : 3 ,
          message: "Data not found."
        });
      } else {
        res.status(200).send({
          return_code : 0 ,
          message: "Data was updated successfully."
        });
      } 
    })
    .catch(err => {
      res.status(500).send({
        return_code : 4 ,
        message: err.message || "Some error occurred."
      });
  });
};