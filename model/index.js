const fs = require('fs/promises')

const contacts = require('./contacts.json')

const getAllContacts = require('./getAllContacts')

const listContacts = async () => {
  try {
    const contacts = await getAllContacts()
    return contacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const contact = contacts.find(
      (contact) => String(contact.id) === String(contactId)
    )
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
