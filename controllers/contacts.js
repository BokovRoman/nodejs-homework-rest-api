const { NotFound } = require('http-errors')
const { Contact } = require('../models')

const { sendSuccessResponse } = require('../utils')

const listContacts = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id })
  sendSuccessResponse(res, { contacts })
}

const getContactById = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const contact = await Contact.findOne(
    { _id: contactId, owner: _id },
    '_id name email phone favorite owner'
  )
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { contact })
}

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)
  sendSuccessResponse(res, { contact }, 201)
}

const removeContactById = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  })

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }

  sendSuccessResponse(res, { message: 'Success remove', contact })
}

const updateContactById = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: _id,
    },
    req.body,
    {
      new: true,
    }
  )
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { contact })
}

const updateFavoriteStatus = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const { favorite } = req.body
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: _id,
    },
    { favorite },
    { new: true }
  )
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { contact })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavoriteStatus,
}
