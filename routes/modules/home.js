const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then((records) => {
      Category.find()
        .lean()
        .then((categories) => {
          return res.render('index', { records, categories })
        })

    })
    .catch(error => console.error(error))
})



module.exports = router