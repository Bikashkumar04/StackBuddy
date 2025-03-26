const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Use a valid email ID");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // optional, if you're validating elsewhere
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value) {
      if (value && !["male", "female"].includes(value.toLowerCase())) {
        throw new Error("Gender must be 'male' or 'female'");
      }
    },
  },
  photoUrl: {
    type: String,
    validate(value) {
      if (value && !validator.isURL(value)) {
        throw new Error("Use a valid photo URL");
      }
    },
  },
  about: {
    type: String,
    default: "This is default about user !!",
    maxlength: 250, // optional
  },
  skills: {
    type: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
