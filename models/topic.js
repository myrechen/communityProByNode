var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/CommunityPro', { useMongoClient: true })
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema
// 设计话题表结构
var topicSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	section: {
        type: Number,
        enum: [0,1,2,3],
        required: true
        //0--分享 1--问答 2--招聘 3--客户端测试
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
	created_time:{
		type:Date,
		// 注意：这里不要写 Date.now() 因为会即刻调用
    	// 这里直接给了一个方法：Date.now
    	// 当你去 new Model 的时候，如果你没有传递 create_time
    	// 则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
		default:Date.now
	}
})

// 导出模型
module.exports = mongoose.model('Topic', topicSchema)

