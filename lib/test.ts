import Api, { Request, object2query } from './index';
let admin = new Api("api", {
    baseUrl: "http://exvu.vip//1",
    onRequest: (req: any, data: any) => {
        req.headers.set("afasdf", "1")
        // req.body.append("a","1")
        console.log(req, data)
        //上传token
    },
    onResponse: (res: any) => {
        //保存token
    }
});
admin.get('/',{
    a:1
},{
    headers:{
        "a":1111
    }
});
//输出querystring
// console.log(admin.querystring("/11"))
// console.log(object2query({
//     a: 1,
//     b:[1,2],
//     c:{
//         a:1,
//         b:[1,3]
//     }
// }))

// admin.post('/admin/v1/', {
//     a: 1,
//     b: 2
// }, {
//         headers: {
//             'confetn': 'fasdfasf',
//         }

//     });