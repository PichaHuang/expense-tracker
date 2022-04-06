const mongoose = require('mongoose')
const Record = require('../record')


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create({
    name: '午餐',
    amount: 200
  })
  console.log('done')
})

