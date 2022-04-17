const express = require('express')
const app = express()


const exphbs = require('express-handlebars')
const port = 3030
const Todo = require('./models/todo')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 取得資料庫連線狀態
// 引用路由器
const routes = require('./routes')

// const mongodb_url = require('./mongodb_url')
// const mongoose = require('mongoose') // 載入 mongoose
// const db = mongoose.connection
// // 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })
// // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(mongodb_url(), { useNewUrlParser: true, useUnifiedTopology: true })

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


// 將 request 導入路由器
app.use(routes)





app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
})


// // Route加進來 刪掉
// app.get('/', (req, res) => {
//   Todo.find()// 取出 Todo model 裡的所有資料
//     .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
//     .then(todos => res.render('index', { todos: todos }))// 將資料傳給 index 樣板
//     .catch(error => console.error(error))// 錯誤處理
// })

// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/todos', (req, res) => {
//   const name = req.body.name

//   //第一種寫法
//   // const todo = new Todo({name})
//   // return todo.save()
//   //   .then(() => res.redirect('/'))
//   //   .catch(error => console.log(error))

//   //第二種寫法
//   return Todo.create({ name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })



// app.get('/todos/:id', (req, res) => {
//   // 動態參數，可以用 req.params 取出
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })

// app.get('/todos/:id/edit', (req, res) => {
//   // 動態參數，可以用 req.params 取出
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })

// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   const { name, isDone } = req.body
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on'
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })