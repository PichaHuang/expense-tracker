const mongoose = require('mongoose')
const Category = require('../category')
const categoryList = require('./categoryList.json').results


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  return Promise.all(Array.from(
    categoryList, (_, i) => {
      return Category.create({
        name: categoryList[i].name,
        icon: categoryList[i].icon
      })
    }
  ))
    .then(() => {
      console.log('categorySeeder done!')
      process.exit()
    })

})
