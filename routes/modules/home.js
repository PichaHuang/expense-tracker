const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id

  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => {
      let totalAmount = 0
      Array.from(records, record => {
        totalAmount += Number(record.amount)
      })
      return res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))

})



module.exports = router