module.exports = (mongoose, mongoosePaginate) => {
    const schema = mongoose.Schema( {
      qr_no: String ,
      firstname: String ,
      middlename: String ,
      lastname: String ,
      mobile_no: String ,
      email_address: String ,
      home_address: String ,
      barangay: String ,
      city: String ,
      age: String ,
      sex: String ,
      status: String 
    }, { timestamps : true } );

    schema.method("toJSON", function() {
      const { _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    schema.set('versionKey', false);
    schema.plugin(mongoosePaginate);

    const citizen_tbl = mongoose.model("citizen_tbl", schema);
    return citizen_tbl;
};  