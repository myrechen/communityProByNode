var express = require('express')

var router = express.Router()

var User = require('./models/user.js')

var md5 = require('blueimp-md5')

// 主页请求
router.get('/', function(req,res){
	res.render('index.html')
})

router.get('/login', function(req,res){
	res.render('login.html')
})

router.post('/login', function(req,res){
	
})

router.get('/register', function(req,res){
	res.render('register.html')
})

// 处理注册请求
router.post('/register', function(req,res){
	// 获取表单数据
	var registerBody = req.body

	// 操作数据库
	User.findOne({
		$or:[
			{ email:registerBody.email },
			{ nickname:registerBody.nickname }
		]
	},function(err,data){
		if (err) {
			// Express 提供了一个响应方法：json
    	  	// 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      		return res.status(500).json({
        		success: false,
        		message: 'Server error'})
    	}
    	if (data) {
      		// 邮箱或者昵称已存在
      		return res.status(200).json({
        		err_code: 1,
        		message: 'Email or nickname aleady exists.'
			})
      		return res.status(200).send(`邮箱或者密码已存在，请重试`)
  		}

  		// 对密码进行 md5 重复加密
    	registerBody.password = md5(md5(registerBody.password))

  		// 保存用户注册信息
  		new User(registerBody).save(function(err,data){
  			if(err){
  				return res.status(500).json({
        		err_code: 500,
          		message: 'Internal error.'
				})
  			}
  			// 成功注册
  			return res.status(200).json({
  			err_code: 0,
        	message: 'OK'})
  		})
  		//console.log('ok')
	})
	// 发送响应
	//console.log(req.body)
})

module.exports = router