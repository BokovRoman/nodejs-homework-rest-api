const sgMail = require('@sendgrid/mail')
const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
  const msg = { ...data, from: 'rejayzer@gmail.com' }
  await sgMail.send(msg)
}

module.exports = sendEmail
