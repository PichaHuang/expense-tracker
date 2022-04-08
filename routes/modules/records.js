const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const data = req.body
  const categoryName = data.categoryName
  console.log(req.body)

  return Category.findOne({ name: categoryName })
    .then(category => {
      data.categoryId = category._id
      data.userId = userId
      return Record.create(data)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })

})

// 修改
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      return Category.find({}, { name: 1, _id: 1 })
        .lean()
        .then(categories => {
          const categorySelect = categories.find((category) => {
            return category._id.toString() === record.categoryId.toString()
          })
          categories = categories.filter(item => {
            return item.name !== categorySelect.name
          })
          return res.render('edit', { record, categories, categorySelect: categorySelect.name })
        })
    })
})

router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const data = req.body
  const categoryName = req.body.categoryName
  const category = await Category.findOne({ name: categoryName }).lean()
  data.categoryId = category._id

  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = data.name
      record.amount = data.amount
      record.categoryId = data.categoryId
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




module.exports = router