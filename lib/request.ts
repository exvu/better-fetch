interface RequestOptions {
    url: string,
    method: string,
    type?: 'request' | 'upload' | 'download',
    body?: { [key: string]: any },
    callback?: any,
    onRequest?: Function,
    onResponse?: Function,
    headers?: { [key: string]: string },
    mode?: "no-cors" | "cors",
    isFetch?: boolean,
    timeout?: number
}
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
    console.log(data)
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
        console.log(value)
        formData.append(value[0], value[1]);
    }
    return formData;
}

export function buildUrl(url: string): string {
    return (url).replace(/[^(https?:)]\/\//ig, '\/').replace(/\/\??$/, '');
}
export default class CRequest {


    private _options: any;
    /**
     * 
     * @param _options 处理数据
     */
    constructor(_options: any) {
        let { url = '', method, body: _body, headers = {}, onRequest, onResponse, mode = 'no-cors', isFetch = true, type, callback, timeout } = _options;
        method = _options.method.toUpperCase();
        url = buildUrl(url);
        let body: any = {};
        //参数请求前处理
        if (onRequest) {
            _body = onRequest(_body);
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (method == 'GET') {
            let str = params2String(_body || {});
            if (/[&?][\w-]+=[\w-]+$/.test(url)) {
                url += '&' + str;
            } else {
                url += '?' + str;
            }
        } else {
            //数据存在 并且长度大于0
            if (_body && Object.prototype.toString.call(_body) === '[object Object]' && Object.keys(_body).length > 0) {
                switch (headers['Content-Type']) {
                    case 'multipart/form-data':
                        //转换数据
                        body = params2FormData(_body);
                        break;
                    case 'text/xml':
                        body = _body;
                        break;
                    case 'application/json':
                        body = JSON.stringify(_body);
                        break;
                    case 'application/x-www-form-urlencoded':
                    default:
                        body = params2String(_body);
                        break;
                }
            }
        }
        this._options = {
            url: encodeURI(url), method, headers, body, mode, isFetch, callback, timeout, type
        }
        this._options = this.objectFilter(this._options, (key, value) => value != undefined || value != null);
    }
    private objectFilter(obj: { [index: string]: string }, callback: (key: string, value: any) => {}) {

        let data: { [index: string]: string } = {};
        for (let key in obj) {
            if (callback(key, obj[key])) {
                data[key] = obj[key];
            }
        }
        return data;
    }
    public querystring(): string {
        return this._options.url;
    }
    public request(): Promise<Response> {
        return new Promise((resolve, reject) => {
            try {
                let promise;
                if ('fetch' in window && this._options.isFetch) {
                    promise = this.doFetch().then(resolve, reject);
                } else {
                    promise = this.doXmlHttpRequest().then(resolve, reject);
                }
                return promise;
            } catch (e) {
                reject(e);
            }
        })
    }
    private doFetch(): Promise<Response> {
        return new Promise((resolve, reject) => {
            try {
                let { url = '', method, body, headers = {}, onResponse, mode = 'no-cors', isFetch = true, type, callback, timeout } = this._options;
                if (type != "request") {
                    reject("fetch not suppert " + type)
                }
                let timeoutId: any;
                if (timeout) {
                    timeoutId = setTimeout(function () {
                        reject(new Error("fetch timeout"))
                    }, timeout);
                }
                let _fetch: any = fetch(url, {
                    method: method,
                    headers,
                    mode,
                    ...method == 'GET' ? { body: body } : {}
                }).then((res: Response) => {
                    clearTimeout(timeoutId);
                    if (res.status >= 200 && res.status < 300) {
                        return res;
                    }
                    const error: any = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }).then((res: Response) => {
                    if (onResponse) {
                        res = onResponse(res);
                    }
                    resolve(res);
                }).catch((err) => {
                    clearTimeout(timeoutId);
                    reject(err)
                });

                // _fetch.abort = () => {
                //     reject(new Error("fetch abort"))
                // };
                // return _fetch;
            } catch (e) {
                reject(e);
            }
        });
    }

    private doXmlHttpRequest(): Promise<Response> {
        return new Promise((resolve, reject) => {
            try {
                let { url = '', method, body, headers = {}, onResponse, mode = 'no-cors', isFetch = true, type, callback, timeout } = this._options;
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
                // Promise.abort = () => {
                //     xmlHttp.abort();
                //     reject(new Error("fetch abort"))
                // };
                xmlHttp.open(method, url, true);
                switch (type) {
                    case 'upload':
                        if (Object.prototype.toString.call(callback) == '[object Object]') {
                            reject("callback must object");
                        }
                        callback.progress && (xmlHttp.upload.onprogress = (event) => {
                            callback.progress(event.loaded, event.total)
                        });
                        callback.loadstart && (xmlHttp.upload.onloadstart = callback.loadstart);
                        callback.loadend && (xmlHttp.upload.onloadend = callback.loadend);
                        callback.error && (xmlHttp.upload.onerror = callback.error);
                        callback.timeout && (xmlHttp.upload.ontimeout = callback.timeout);
                        callback.abort && (xmlHttp.upload.onabort = callback.abort);
                        callback.load && (xmlHttp.upload.onload = callback.load);
                        break;
                    case 'download':
                        xmlHttp.onprogress = (event) => {
                            callback(event.loaded, event.total)
                        };
                        xmlHttp.responseType = 'blob';
                        break;
                    default:

                        break;
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
                            headers
                        });
                        resolve(res);
                    } catch (err) {
                        reject(err)
                    }
                }
                xmlHttp.onerror = (err) => {
                    reject(err)
                }
                xmlHttp.send(method != 'GET' ? body : null);
            } catch (e) {
                reject(e);
            }
        });
    }
}