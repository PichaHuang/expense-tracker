const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const categoryList = require('./categoryList.json').results
const db = require('../../config/mongoose')


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
      console.log('category seeder done!')
      process.exit()
    })

})
