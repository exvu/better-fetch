import CFetch, { request, upload, download } from './index';
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
//使用then方法获取数据
user.list().then((res)=>{
    let list = res.data;//接口返回数据
}).catch((err)=>{
    //错误信息
    //...
})
//使用await/async获取数据
let list = await user.list();

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