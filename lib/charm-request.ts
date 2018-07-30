import Request, { RequestMode } from './request';
import Response from './response';
import Headers from './header';
import { object2query, params2FormData, isIncloudFile } from './common';

export function buildUrl(url: string): string {
    return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\??$/, '\/');
}
export function doRequest(url: string, {
    method, headers, mode, onResponse, onRequest, timeout, data, xhr
}: {
        method: string, mode: RequestMode, headers: { [index: string]: string },
        onRequest: (req: Request, data: any) => any,
        onResponse: (res: Response) => any,
        data: { [index: string]: any } | string,
        timeout: number,
        xhr: Function
    }): Promise<Response> {
    let body: any;
    //创建请求对象
    let request = new Request(buildUrl(url), {
        method,
        headers: new Headers(headers),
        mode,
    });
    //调用onrequest
    onRequest(request, data);

    //不存在数据,就自动判断
    if (!request.headers.get('Content-Type')) {
        if (typeof data !== "object") {
            try {
                data = JSON.parse(data);
                request.headers.set('Content-Type', "application/json");

            } catch (e) {
                request.headers.set('Content-Type', "text/plain");
            }

        } else {
            if (isIncloudFile(data)) {
                request.headers.set('Content-Type', "multipart/form-data");
            } else {
                request.headers.set('Content-Type', "application/x-www-form-urlencoded");
            }
        }

    }
    let contentType = request.headers.get('Content-Type') || '';
    let index = contentType.indexOf(';')
    let dataType = index != -1 ?
        contentType.substring(0, contentType)
        : contentType;

    switch (dataType) {
        case "application/json":
            try {
                if (typeof data === "string") {
                    body = JSON.parse(data);
                } else if (typeof data == "object") {
                    body = JSON.stringify(data);
                } else {
                    throw new Error("application/json allow data type json string or object");
                }
            } catch (e) {
                throw new Error("application/json allow data type json string  or object");
            }
            break;
        case "application/x-www-form-urlencoded":

            if (typeof data == "object") {
                body = object2query(data);
            } else {
                throw new Error("application/x-www-form-urlencoded  allow data type object");
            }
            break;
        case "multipart/form-data":
            if (typeof data == "object") {
                body = params2FormData(data);
            } else {
                throw new Error("multipart/form-data allow  data type object");
            }
            request.headers.delete('content-type');
            break;
        case "text/plain":
        default:
            if (typeof data !== "string") {
                body = JSON.stringify(data);
            }
            break;
    }

    request._initBody(body, {
        method,
        headers: new Headers(headers),
        mode,
    })
    return doXmlHttpRequest(request, {
        onResponse, timeout, xhr
    });
}
export function doXmlHttpRequest(request: Request, { onResponse, timeout, xhr }: {
    onResponse: (res: Response) => any,
    timeout: number,
    xhr: Function
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
            //设置请求方法与请求地址
            xmlHttp.open(request.method, request.url, true);

            //调用xhr方法
            if (xhr) {
                if (Object.prototype.toString.call(xhr) != '[object Function]') {
                    reject("xhr必须是函数");
                } else {
                    xhr(xmlHttp);
                }
            }

            //存在请求头就设置请求头
            if (request.headers) {
                let headers = request.headers.entries();
                headers.forEach(([key, value]: any) => {
                    xmlHttp.setRequestHeader(key, value);
                });
            }
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
                    let data = onResponse(res);
                    if (!data) {
                        reject("onResponse must return");
                    }
                    resolve(data);
                } catch (err) {
                    reject(err)
                }
            }
            xmlHttp.onerror = (err) => {
                reject(err)
            }
            xmlHttp.send(request._bodyInit || null);
        } catch (e) {
            reject(e);
        }
    });
};


