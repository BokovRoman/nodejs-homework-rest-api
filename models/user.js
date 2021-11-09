const { Schema, model } = require('mongoose')
const Joi = require('joi')

const passwordRegexp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const userSchema = Schema({
  password: {
    type: String,
    match: [
      passwordRegexp,
      'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
    ],
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true }
)

const userSchemaJoi = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Passsword must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length'
    )
    .required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  userSchemaJoi,
}