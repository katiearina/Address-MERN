// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  Address: {
    type: String
  },
  CreatedTime: {
    date: { type: Date, default: Date.now }
  }
});

// Create the Model
var Address = mongoose.model("Address", AddressSchema);

// Export it for use elsewhere
module.exports = Address;