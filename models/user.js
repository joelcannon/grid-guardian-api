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
    // password: {
    //   type: String,
    //   required: false,
    //   validate: {
    //     validator: function (v) {
    //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //         v,
    //       )
    //     },
    //     message:
    //       'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one numeral and one special character.',
    //   },
    // },
    // phone: {
    //   type: String,
    //   validate: {
    //     validator: function (v) {
    //       return /^\+[1-9]\d{1,14}$/.test(v)
    //     },
    //     message: (props) => `${props.value} is not a valid phone number!`,
    //   },
    //   required: [false, 'User phone number required'],
    //   unique: true,
    // },
    // firstName: String,
    // lastName: String,
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

// UserSchema.pre('save', async function (next) {
//   if (!(await isPhoneNumberValid(this.phone))) {
//     throw new Error('Phone number is not valid SMS-capable number!')
//   }
//   next()
// })

const User = mongoose.model('User', UserSchema)

const userJoiSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[^s]{3,}$')).required(),
  email: Joi.string().email().required(),
  // password: Joi.string()
  //   .pattern(
  //     new RegExp(
  //       '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$',
  //     ),
  //   )
  //   .required(),
  // phone: Joi.string().pattern(new RegExp('^\\+[1-9]\\d{1,14}$')).required(),
  // firstName: Joi.string(),
  // lastName: Joi.string(),
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
//  *         - password
//  *         - phone
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
//  *         password:
//  *           type: string
//  *           description: The user's password. Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one numeral and one special character.
//  *           minLength: 8
//  *           pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
//  *         phone:
//  *           type: string
//  *           description: The user's phone number. Must be a valid phone number.
//  *           pattern: '^\+[1-9]\d{1,14}$'
//  *         firstName:
//  *           type: string
//  *           description: The user's first name
//  *         lastName:
//  *           type: string
//  *           description: The user's last name
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
