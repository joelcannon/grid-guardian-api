// middlewares/validateOrganization.js
const { organizationJoiSchema } = require("../models/organization-model");

const validateOrganization = (req, res, next) => {
  // console.log('body', req.body)
  const { error } = organizationJoiSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  next();
};

module.exports = validateOrganization;
