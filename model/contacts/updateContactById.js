const getAllContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

const updateContactsById = async (id, body) => {
  const contacts = await getAllContacts()
  const result = contacts.find((contact) => String(contact.id) === String(id))
  if (result) {
    Object.assign(result, body)
  }
  updateContacts(contacts)
  return result
}

module.exports = updateContactsById
