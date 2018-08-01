
charm-api 使用文档
==========
是一款迷人的js请求工具，可以方便地进行js请求  
工具使用`XMLHttpRequest`对象发起js请求   
支持`restful`,可以使用GET,POST,DELETE,PUT,PATCH方法  
支持`Promise`异步请求,可以使用then方法或者await/async  
工具会自动根据请求数据选择合适的content-type,用户也可以在onrequest中手动指定
工具会在每次请求中自动在url后中添加随机数参数(参数名默认为_r),避免低版本出现接口缓存问题

安装与配置
==========
```sh
$ npm install -g @exvu/charm-api #全局安装
$ npm install --save-dev @exvu/charm-api #局部安装
```
用法
==========
用法请参照例子文件夹下  
## `charm-api`两种使用方法
1. api 配置使用
2. 传统请求

# api配置使用
用于创建一个api请求实例，同一个服务器的请求可以统一使用
```
new Api(key,[options])
```
* **key** 实例的唯一键，根据key可以拿到配置过的实例
<h2 align="center">Options</h2>  

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:--------:|
|**`baseUrl`**|`string`| null| 基地址，api服务器的地址|
|**`onRequest`**|`function`| null| api请求前的回调函数,可以在这里统一传递公共参数 例如:token|
|**`onResponse`**|`function`| null| api请求响应后，对数据进行处理后返回，必须有返回 返回值将会传递给then的第一个参数|
|**`header`**|`object`| {}| 请求头|
|**`timeout`**|`number`| 4000 | 过期时间|
获取请求对象
```
//通过getInstance获取指定的api实例
let api = Api.getInstance("api");
```

#### 例子
```javascript
//导入包
import Api, { Respnse, object2query } from '../lib/index';
//创建一个api实例
let api = new Api("api", {
    //基地址
    baseUrl: "http://exvu.vip//1",
    //请求前数据处理
    onRequest: (req: any) => {

        //设置请求头
        req.headers.set("afasdf", "1")
        //修改请求数据
        req.data = { a: 1 };
    },
    //
    onResponse: (res: Respnse) => {
        //获取请求头
        res.headers.get("access-token")
        //必须返回数据,then方法会接收
        return res;
    }
});
api.get('/login', { account: 'admin',password:'123456' }, {
    //局部请求头
    headers: {
        "a": 1111
    },
    //获取xmlhttprequest对象,用于终止请求,上传进度
    xhr: function (xhr: XMLHttpRequest) {

    }
}).then(res=>res.json()).then(data=>{
    console.log(data);
});
```


例子
```javascript
let user = {
    list: (data)=>api.get("/list/",data),//获取用户列表
    add: (data)=>api.post("/add/",data),//添加用户
    update: (data)=>api.put("/update/",data),//修改用户基本信息
    patch:(data)=>api.patch("/patch/",data),//更新用户部分信息
    delete: (data)=>api.delete("/delete/",data),//删除用户
    uploadAvatar:(data)=>api.post("/uploadAvatar/",{
        file:file.files[0],
    }),//上传头像
    download: api.get("/download/"),//下载文件
}
//1.使用then方法获取数据
user.list().then((res)=>{
    let list = res.data;//接口返回数据
}).catch((err)=>{
    //错误信息
    //...
})
//2.使用await/async获取数据
let list = await user.list();
```