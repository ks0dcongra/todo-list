const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const mongodb_url = require('./mongodb_url')
const exphbs = require('express-handlebars')
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect(mongodb_url(), { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})



app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
})
