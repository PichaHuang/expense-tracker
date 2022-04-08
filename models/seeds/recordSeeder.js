const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const categoryList = require('./categoryList.json').results
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '1234',
  categories: categoryList
}


db.once('open', () => {
  console.log('mongodb connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from((categoryList), category => {
        const expense = Math.floor(Math.random() * 100) + 1
        return Category.findOne({ name: category.name })
          .lean()
          .then(category => {
            return Record.create({
              name: category.name,
              amount: expense,
              userId,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('record seeder done!')
      process.exit()
    })
})

