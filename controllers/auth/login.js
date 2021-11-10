const { User } = require('../../models')
const { sendSuccessResponse } = require('../../utils')
const { Unauthorized } = require('http-errors')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
//   const newUser = new User({ email })
//   newUser.setPassword(password)
//   const { subscription } = await newUser.save()
//   sendSuccessResponse(res, { email, subscription }, 201)
}

module.exports = login
