const mongoose = require('mongoose')
const app = require('../app')

const DB_HOST = 'mongodb+srv://Roman:8w6qL1oR9ZdcDCYA@cluster0.jdtlp.mongodb.net/db-contacts?retryWrites=true&w=majority'

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
