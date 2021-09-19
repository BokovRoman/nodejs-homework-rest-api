const fs = require('fs/promises')
const { nanoid } = require('nanoid')

const contacts = require('./contacts.json')

const getAllContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

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

const addContact = async (name, email, phone) => {
  const contacts = await getAllContacts()
  const id = nanoid(5)
  const newContact = { name, email, phone, id }
  contacts.push(newContact)

  try {
    await updateContacts(contacts)
    return newContact
    // console.table(newContact)
  } catch (error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
