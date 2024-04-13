// middlewares/validateUserUpdate.js
const Joi = require("joi");
const { organizationJoiSchema } = require("../models/organization-model");

const organizationUpdateJoiSchema = Joi.object({
  name: organizationJoiSchema.extract("name").optional(),
  email: organizationJoiSchema.extract("email").optional(),
  phone: organizationJoiSchema.extract("phone").optional(),
  address: organizationJoiSchema.extract("address").optional(),
  website: organizationJoiSchema.extract("website").optional(),
  description: organizationJoiSchema.extract("description").optional(),
});

const validateUserUpdate = (req, res, next) => {
  const { error } = organizationUpdateJoiSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  next();
};

module.exports = validateUserUpdate;
