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

const removeContact = async (contactId) => {
  const contacts = await getAllContacts()
  const idx = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  )
  if (idx === -1) {
    return null
  }

  const removeContact = contacts[idx]

  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return removeContact
}

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

const updateContactId = async (id, body) => {
  const contacts = await getAllContacts()
  const [result] = contacts.filter((contact) => contact.id === id)
  if (result) {
    Object.assign(result, body)
    updateContacts(contacts)
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactId,
}
