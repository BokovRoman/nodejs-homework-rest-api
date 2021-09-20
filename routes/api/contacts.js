const { json } = require('express')
const express = require('express')
const router = express.Router()

const { contactsSchema } = require('../../schemas')

const contactsOperation = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    // console.log(req.params)
    const { contactId } = req.params
    const contact = await contactsOperation.getContactById(contactId)
    if (!contact) {
      const error = new Error(`Product with id ${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Product with id ${contactId} not found`
      // })
      // return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // console.log(req.body)
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const contact = await contactsOperation.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperation.removeContact(contactId)
    if (!contact) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'success delete'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const contact = await contactsOperation.updateContactId(contactId, req.body)
    if (!contact) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
