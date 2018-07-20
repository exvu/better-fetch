import CFetch from './cFetch';

let api = CFetch.create("api", {
    url: "",
    onRequest: (req:any) => {


        req.setHeader("afasdf")
        //上传token
    },
    onRequest: (res:any => {
        //保存token
    }
});

Headers