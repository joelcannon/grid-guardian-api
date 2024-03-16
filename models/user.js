const mongoose = require('mongoose')
const isPhoneNumberValid = require('../utils/phone-validator')

module.exports = (mongoose) => {
  const UserSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        validate: {
          validator: function (v) {
            return /^\+[1-9]\d{1,14}$/.test(v)
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: [true, 'User phone number required'],
        unique: true,
      },
      firstName: String,
      lastName: String,
      role: {
        type: String,
        enum: ['admin', 'tech', 'viewer'],
        default: 'viewer',
      },
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
      },
    },
    {
      timestamps: true, // This will automatically add createdAt and updatedAt fields
      collection: 'users', // explicitly set the collection name
    },
  )

  UserSchema.pre('save', async function (next) {
    if (!(await isPhoneNumberValid(this.phone))) {
      throw new Error('Phone number is not valid SMS-capable number!')
    }
    next()
  })

  const User = mongoose.model('User', UserSchema)
  return User
}
