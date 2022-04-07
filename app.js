const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const Record = require('./models/record')
const Category = require('./models/category')

const app = express()
const PORT = 3000



mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// 首頁
app.get('/', (req, res) => {
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

// 新增
app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, categoryId, amount } = req.body
  console.log(req.body)
  return Record.create({
    name,
    date,
    categoryId,
    amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 修改
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
