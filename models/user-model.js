const mongoose = require('mongoose')
// const isPhoneNumberValid = require('../utils/phone-validator')
const Joi = require('joi')

const Roles = {
  VIEWER: 'Viewer',
  OPERATOR: 'Operator',
  MANAGER: 'Manager',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin',
}

const UserSchema = mongoose.Schema(
  {
    githubId: String,
    displayName: String,
    profileUrl: String,
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s]{3,}$/.test(v)
        },
        message:
          'Username must be at least 3 characters long and contain no spaces.',
      },
    },
    email: {
      type: String,
      required: false,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v)
        },
        message: 'Email is not valid.',
      },
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.VIEWER,
    },
    isActive: {
      type: Boolean,
      default: true, // Set to true by default
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
)

UserSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
  const result = await this.findOne(condition)
  return result || this.create(doc)
}

const User = mongoose.model('User', UserSchema)

const userJoiSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[^s]{3,}$')).required(),
  email: Joi.string().email().required(),

  role: Joi.string()
    .valid(...Object.values(Roles))
    .default(Roles.VIEWER),
  isActive: Joi.boolean().default(true),
  organization: Joi.string(), // assuming organization id is a string
})

module.exports = {
  Roles,
  User,
  userJoiSchema,
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username. Must be at least 3 characters long and contain no spaces.
 *           minLength: 3
 *           pattern: '^[^\s]{3,}$'
 *         email:
 *           type: string
 *           description: The user's email. Must be a valid email format.
 *           format: email
 *         role:
 *           type: string
 *           enum: ['Viewer', 'Operator', 'Manager', 'Admin', 'Super Admin']
 *           description: The user's role
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: The active status of the user
 *         organization:
 *           type: string
 *           description: The ID of the user's organization
 */
