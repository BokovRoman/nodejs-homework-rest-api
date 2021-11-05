const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const phoneRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    match: [
      nameRegexp,
      'Name can only consist of letters, apostrophes, dashes and spaces.',
    ],
  },
  email: {
    type: String,
    required: [true, 'This field is required'],
  },
  phone: {
    type: String,
    match: [
      phoneRegexp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    ],
    required: [true, 'This field is required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{ versionKey: false, timestamps: true }
)

const Contact = model('contact', contactSchema)

module.exports = Contact
