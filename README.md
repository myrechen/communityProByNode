# node.js多人社区案例

## 1.模板页

## 2.路由设计

|      请求路径     | 请求方法 | get参数  |         post参数         | 是否需要登录权限 |       备注       |
|-------------------|----------|----------|--------------------------|------------------|------------------|
| /                 | get      |          |                          |                  | 首页             |
| /register         | get      |          |                          |                  | 注册页面         |
| /register         | post     |          | email,nickname,passsword |                  | 提交注册请求     |
| /login            | get      |          |                          |                  | 登录页面         |
| /login            | post     |          | email，password          |                  | 提交登录请求     |
| /logout           | get      |          |                          |                  | 退出登录         |
| /settings/profile | get      |          |                          | 是               | 进入设置页面     |
| /settings/admin   | get      |          |                          | 是               | 进入修改密码页   |
| /settings/admin   | post     |          | oldpassword,newpassword  | 是               | 提交修改密码请求 |
| /settings/delete  | get      | email    |                          | 是               | 注销账户请求     |
| /topic/new        | get      | nickname |                          | 是               | 进入写博客页面   |
|                   |          |          |                          |                  |                  |

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

## 5.进入修改密码页请求

## 6.处理注销账户请求

## 7.进入写文章页请求

## 8.提交修改密码请求

## 9.处理修改个人信息请求
    - 生日的时间设置没有限制

## 10.处理修改头像的请求
    - 首先使用{{ user.name }}让服务端渲染头像
    - 实现了用户上传头像的请求功能
        + **使用form的submit事件提交才能收到响应并重定向**
        + 限制头像图片的格式，未限制大小
        + 未完成预览头像的功能
    - 服务端处理请求
        + 接收图片和存储图片
        + 修改MongoDB中user的avatar路径
            - 这个路径要在前面加‘/’，否则只有index.html的头像能显示
            - profile.html的右上角和头像显示不了图片
            - 还没有找到为什么index.html的头像能显示的原因
            - 同样是继承header的部分，就很离谱
        + 更新session



