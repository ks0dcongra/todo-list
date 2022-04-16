const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const mongodb_url = require('./mongodb_url')
const exphbs = require('express-handlebars')
const port = 3000
const Todo = require('./models/todo')
// 引用 body-parser
const bodyParser = require('body-parser')
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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(mongodb_url(), { useNewUrlParser: true, useUnifiedTopology: true })


app.get('/', (req, res) => {
  Todo.find()// 取出 Todo model 裡的所有資料
    .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos: todos }))// 將資料傳給 index 樣板
    .catch(error => console.error(error))// 錯誤處理
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  //第一種寫法
  // const todo = new Todo({name})
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  //第二種寫法
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
})

app.get('/todos/:id', (req, res) => {
  // 動態參數，可以用 req.params 取出
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  // 動態參數，可以用 req.params 取出
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})