import Request, { RequestMode } from './request';
import Response from './response';
import Headers from './header';
/**
 * 
 * 解析参数，
 * 将对象转换成obj[a]的形式
 * 将数组转换成obj[]的形式
 */
function parseParams(_data: { [key: string]: any }, prefix: string = '') {
    let data: Array<Array<any>> = [];
    for (let key in _data) {
        if (_data[key] == undefined) {
            continue;
        }
        let _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data.push(...parseParams(_data[key], _key));
        } else if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (let v of _data[key]) {
                data.push([_key + '[]', v]);
            }
        } else {
            data.push([_key, _data[key]]);
        }
    }
    return data;
}
/**
 * 将参数转换为string
 */
export function params2String(_data: { [key: string]: any }): string {

    let data: Array<Array<any>> = parseParams(_data);
    return data.map(item => item.join('=')).join('&');
}
/**
 * 将参数转换为formdata
 */
export function params2FormData(_data: { [key: string]: any }): FormData {

    let data: Array<Array<any>> = parseParams(_data);
    let formData = new FormData();
    for (let value of data) {
        formData.append(value[0], value[1]);
    }
    return formData;
}

export function buildUrl(url: string): string {
    return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\??$/, '\/');
}
export function doRequest(url: string, {
    method, headers, mode, onResponse, onRequest, callback, timeout, body
}: {
        method: string, mode: RequestMode, headers: { [index: string]: string },
        onRequest: (req: Request) => any,
        onResponse: (res: Response) => any,
        callback: { [index: string]: any },
        body: { [index: string]: any },
        timeout: number
    }): Promise<Response> {
    //创建请求对象
    let request = new Request(buildUrl(url), {
        method,
        headers: new Headers(headers),
        mode,
        body
    });
    //调用onrequest
    onRequest(request);
    return doXmlHttpRequest(request, {
        onResponse, callback, timeout
    });
}
export function doXmlHttpRequest(request: Request, { onResponse, callback, timeout }: {
    onResponse: (res: Response) => any,
    callback: { [index: string]: any, },
    timeout: number
}): Promise<Response> {
    return new Promise((resolve, reject) => {
        try {
            let xmlHttp: XMLHttpRequest;
            //IE7以上
            if ('XMLHttpRequest' in window) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (timeout) {
                xmlHttp.timeout = timeout;
            }
            xmlHttp.open(request.method, request.url, true);
            if (Object.prototype.toString.call(callback) == '[object Object]') {
                callback.progress && (xmlHttp.upload.onprogress = (event) => {
                    callback.progress(event.loaded, event.total)
                });
                callback.loadstart && (xmlHttp.upload.onloadstart = callback.loadstart);
                callback.loadend && (xmlHttp.upload.onloadend = callback.loadend);
                callback.error && (xmlHttp.upload.onerror = callback.error);
                callback.timeout && (xmlHttp.upload.ontimeout = callback.timeout);
                callback.abort && (xmlHttp.upload.onabort = callback.abort);
                callback.load && (xmlHttp.upload.onload = callback.load);
            } else {
                reject("callback must object");
            }
            xmlHttp.onload = () => {
                try {
                    if (xmlHttp.readyState != 4) {
                        return;
                    }
                    let headers: any = {};
                    xmlHttp.getAllResponseHeaders().split('\n').forEach(item => {
                        let index = item.indexOf(':');
                        if (index != -1) {
                            headers[item.substring(0, index)] = item.substr(index + 1).trim();
                        }
                    })
                    let res = new Response(xmlHttp.response, {
                        headers: new Headers(headers),
                        status: xmlHttp.status,
                        statusText: xmlHttp.statusText,
                    });

                    resolve(onResponse(res));
                } catch (err) {
                    reject(err)
                }
            }
            xmlHttp.onerror = (err) => {
                reject(err)
            }
            xmlHttp.send(request.method != 'GET' ? request.body : null);
        } catch (e) {
            reject(e);
        }
    });
}