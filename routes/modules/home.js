const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id


  Record.find({ userId })
    .lean()
    .then((records) => {
      Category.find()
        .lean()
        .then(() => {
          return res.render('index', { records })
        })

    })
    .catch(error => console.error(error))
})



module.exports = router