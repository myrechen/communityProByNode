# node.js多人社区案例

## 1.模板页

## 2.路由设计

|  请求路径 | 请求方法 | get参数 |         post参数         | 是否需要登录权限 |     备注     |
|-----------|----------|---------|--------------------------|------------------|--------------|
| /         | get      |         |                          |                  | 首页         |
| /register | get      |         |                          |                  | 注册页面     |
| /register | post     |         | email,nickname,passsword |                  | 提交注册请求 |
| /login    | get      |         |                          |                  | 登录页面     |
| /login    | post     |         | email，password          |                  | 提交登录请求 |
| /logout   | get      |         |                          |                  | 退出登录     |
|           |          |         |                          |                  |              |

## 3.处理注册请求
    - 获取表单数据
    - 数据库操作
      + 查询 email nickname 是否重复
        * 重复则提示
        * 不重复对密码进行 md5 加密并储存注册信息
    - 发送响应

    > md5加密
    > npm install blueimp-md5
    > var md5 = require('blueipm-md5')

## 4.处理设置页请求
    - 处理设置页路由
    - 渲染设置页


