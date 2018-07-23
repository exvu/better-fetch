import Api from './api';

let api = new Api("api", {
    baseUrl: "",
    onRequest: (req: any) => {
        req.setHeader("afasdf")
        //上传token
    },
    onResponse: (res: any) => {
        //保存token
    }
});
