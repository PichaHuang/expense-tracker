const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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





app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
