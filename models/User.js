const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
