const mongoose = require('mongoose')
const Category = require('../category')


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Category.create({
    name: '家居物業',
  })
  console.log('done')
})
