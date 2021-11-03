const mongoose = require('mongoose')

const app = require('../app')

require('dotenv').config()

const { DB_HOST, PORT = 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
