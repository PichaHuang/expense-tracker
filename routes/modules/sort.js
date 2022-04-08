const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/:sort', async (req, res) => {
  const userId = req.user._id
  const sort = req.params.sort
  const category = await Category.findOne({ name: sort }).lean()

  return Record.find({ categoryId: category._id, userId })
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