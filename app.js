var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router.js')

var session = require('express-session')

var app = express()

// 开放静态资源
app.use('/public/', express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

// 配置art-template
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    通过 req.session 来发访问和设置 Session 成员
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'MYmy',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，都默认直接给你分配一把钥匙
  // false 向session存数据才分配
}))

app.use(router)


app.listen(5000,function(){
	console.log('server is running at 5000...')
})
