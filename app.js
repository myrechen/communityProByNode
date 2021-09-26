var express = require('express')
var path = require('path')

var app = express()

//开放静态资源
app.use('/public/', express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

//配置art-template
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

app.get('/', function(req,res){
	res.render('index.html',{ name:"世界"})
})


app.listen(5000,function(){
	console.log('server is running at 5000...')
})
