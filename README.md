# charm-fetch 使用文档
是一款迷人的js请求工具，可以方便地进行js请求

# 安装与配置
```
npm install -g charm-fetch #全局安装
npm install --save-dev charm-fetch #局部安装
```
安装成功后，就可以使用了  

此工具有两个使用方法  
1. api配置使用
2. 传统请求
## 1. api配置使用
配置如下
```
//导入包
import CFetch from 'charm-fetch';
//创建实例
let api = CFetch.create("api", {
    //基地址 所有请求都会拼接此地址
    url: 'http://localhost:3000/',
    //请求之前的回调函数,可以处理在请求前统一传递公共参数或header
    request: function (req: Request) {
       
    },
    /**
     *请求完成后的回调函数,针对api接口可以统一对响应进行处理后返回
     *返回数据将被then方法或await接收
     **/
    response: function (res: Response) {

    }
})
```
使用方法
```
let user = {
    list: api.get("/list/"),//获取用户列表
    add: api.post("/add/"),//添加用户
    update: api.put("/put/"),//修改用户基本信息
    patch: api.patch("/patch/"),//更新用户部分信息
    delete: api.delete("/delete/"),//删除用户
    uploadAvatar: api.upload("/uploadAvatar/", {
        method: 'POST'//指定请求方法 默认POST 不能是get 
    }),//上传头像
    download: api.download("/download/", {
        method: 'POST'//指定请求方法 默认GET
    }),//下载文件
}
1.使用then方法获取数据
user.list().then((res)=>{
    let list = res.data;//接口返回数据
}).catch((err)=>{
    //错误信息
    //...
})
2.使用await/async获取数据
let list = await user.list();
```
异步上传/下载文件
```
//上传文件
//1.then方法
user.uploadAvatar({
    file
},function(current,total){
    //文件上传进度
}).then((res)=>{
    //响应回调
})
//2.await/async
let result = await user.uploadAvatar({
    file
},function(current,total){
    //文件上传进度
})

//下载文件
//1.then方法
user.download({
    file
},function(current,total){
    //文件下载进度
}).then((res)=>{
    //响应回调
})
//2.await/async
let file = await user.download({
    file
},function(current,total){
    //文件下载进度
})
```
## 2. 传统请求
使用方法
```
//导入包
import {request} from 'charm-fetch';
request({
    url:'http://localhost:3000',
    method:'POST',
}).then((res)=>{
    //响应数据
}).catch((err)=>{
    //捕获异常
})
```
异步上传或下载
```
//导入包
import {upload,download} from 'charm-fetch';
//上传文件
upload({
    url:'http://localhost:3000',
    method:'POST',
},function(){
    //文件上传进度
}).then((res)=>{
    //响应数据
}).catch((err)=>{
    //捕获异常
})
//下载文件
download({
    url:'http://localhost:3000',
    method:'POST',
},function(){
    //文件下载进度
}).then((res)=>{
    //响应数据
}).catch((err)=>{
    //捕获异常
})