import { AdapterOption } from '../../core/doRequest'
import helper from '../../helper';
export default function xhrAdapter({
    request,
    ...config
}: AdapterOption): Promise<Response> {
    return new Promise((resolve, reject) => {
        try {
            let xmlHttp: XMLHttpRequest;
            //IE7以上
            if ('XMLHttpRequest' in window) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (config.timeout) {
                xmlHttp.timeout = config.timeout;
            }
            //设置请求方法与请求地址
            xmlHttp.open(request.method, request.url, true);
            //存在请求头就设置请求头
            if (request.headers) {
                let headers = request.headers.entries();
                headers.forEach(([key, value]: any) => {
                    xmlHttp.setRequestHeader(key, value);
                });
            }
            //设置下载进度回调函数
            if (config.onDownloadProgress && helper.isFunction(config.onDownloadProgress)) {
                xmlHttp.onprogress = config.onDownloadProgress;
            }
            //设置上传进度回调函数
            if (config.onUploadProgress && helper.isFunction(config.onUploadProgress)) {
                xmlHttp.onprogress = config.onUploadProgress;
            }
            xmlHttp.upload.onprogress
            xmlHttp.onreadystatechange = xmlHttp.onload = function onload() {
                try {
                    if (xmlHttp.readyState != 4) {
                        return;
                    }
                    let headers: any = {};
                    //获取response对象
                    xmlHttp.getAllResponseHeaders().split('\n').forEach(item => {
                        let index = item.indexOf(':');
                        if (index != -1) {
                            headers[item.substring(0, index)] = item.substr(index + 1).trim();
                        }
                    })
                    let res = new Response(xmlHttp.responseText, {
                        headers: new Headers(headers),
                        status: xmlHttp.status,
                        statusText: xmlHttp.statusText,
                    });
                    resolve(res);
                } catch (err) {
                    reject(err)
                }
            }
            xmlHttp.onerror = (err) => {
                reject(err)
            }
            const body:any = request.body;
            xmlHttp.send(body || null);
        } catch (e) {
            reject(e);
        }
    });


}