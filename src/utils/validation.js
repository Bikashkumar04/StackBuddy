const validator = require('validator');

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter firstname and lastname");
  }

  if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First name must be between 3 and 50 characters");
  }

  if (lastName.length < 3 || lastName.length > 50) {
    throw new Error("Last name must be between 3 and 50 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8, minLowercase: 1, minUppercase: 1,
    minNumbers: 1, minSymbols: 1
  })) {
    throw new Error("Enter a strong password (min 8 chars, uppercase, lowercase, number, symbol)");
  }
};

module.exports = {
  validateSignUp,
};
