const mongoose = require('mongoose')
const isPhoneNumberValid = require('../utils/phone-validator')
const Joi = require('joi')

const OrganizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // apiKey: {
    //   type: String,
    //   required: true,
    // },
    isActive: {
      type: Boolean,
      default: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    address: String,
    website: String,
    phone: String,
    description: String,
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
    collection: 'organizations', // explicitly set the collection name
  },
)

const OrganizationModel = mongoose.model('Organization', OrganizationSchema)

const organizationJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(new RegExp('^\\+[1-9]\\d{1,14}$')),
  address: Joi.string().email(),
  website: Joi.string().uri({ scheme: ['http', 'https'] }),
  description: Joi.string(),
  isActive: Joi.boolean().default(true),
  owner: Joi.string(), // reference to the owner's user ID
  members: Joi.array().items(Joi.string()), // array of references to the members' user IDs
})

module.exports = {
  OrganizationModel,
  organizationJoiSchema,
}
