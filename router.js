var express = require('express')

var router = express.Router()

var User = require('./models/user.js')

var md5 = require('blueimp-md5')

// 主页请求
router.get('/', function(req,res){
	res.render('index.html',{
		user:req.session.user
	})
})

router.get('/login', function(req,res){
	res.render('login.html')
})

router.post('/login', function(req,res){
	// 获取表单数据
	var loginBody = req.body
	
	// 操作数据库
	User.findOne({
		email: loginBody.email,
		password: md5(md5(loginBody.password)+'MYOUNG')
	}, function(err,data){
		if(err){
			return res.status(500).json({
        		err_code:500,
        		message: err.message
        	})
		}

		// 数据库中没有匹配的用户
		if(! data){
			return res.status(200).json({
        		err_code: 1,
        		message: 'Email or password is invalid.'
			})
		}

		// 匹配成功
		req.session.user = data

		return res.status(200).json({
			err_code: 0,
	    message: 'OK'})
	})
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
    	registerBody.password = md5(md5(registerBody.password)+'MYOUNG')

  		// 保存用户注册信息
  		new User(registerBody).save(function(err,data){
  			if(err){
  				return res.status(500).json({
        		err_code: 500,
          		message: 'Internal error.'
					})
  			}
  			// 成功注册

  			// 注册成功，使用 Session 记录用户的登陆状态, 默认在内存中生成，服务器重启session丢失
  			// 将用户的信息传到 session 中
  			req.session.user = data

  			return res.status(200).json({
  				err_code: 0,
        	message: 'OK'})
  		})
  		//console.log('ok')
	})
	// 发送响应
	//console.log(req.body)
})

router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null

  res.redirect('/')
})

// 进入设置用户信息页面
// 根据路由改变导航栏样式，目前想到的办法：服务端渲染
router.get('/settings/profile', function(req, res){
	res.render('settings/profile.html', {user:req.session.user, status1:'active'})
})

router.get('/settings/admin', function(req, res){
	res.render('settings/admin.html', {user:req.session.user, status2:'active'})
})

// 处理注销账户请求
router.get('/settings/delete', function(req, res){
	User.deleteOne({email:req.session.user.email}, function(err,data){
		if(err){
			return res.status(500).json({
        		err_code:500,
        		message: err.message
        	})
		}
		// 注销成功
		// 先清除session
		req.session.user = null
		res.status(200).json({
        err_code:0,
        message:'OK'
    })
	})
})

module.exports = router