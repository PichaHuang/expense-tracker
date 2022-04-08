const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '1234'
}


db.once('open', () => {
  console.log('mongodb connected!')
  
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: `午餐-${i}`,
      amount: 200
    })
  }

  console.log('done')
})

