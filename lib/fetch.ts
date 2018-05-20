
interface RequestOptions {
    url: string,
    method: string,
    type?: 'request' | 'upload' | 'download',
    body?: Body,
    callback?: Function,
    onRequest?: Function,
    onResponse?: Function,
    headers?: { [key: string]: string },
    mode?: RequestMode,
    isFetch?: boolean
}
export type Body = FormData | string | null | { [key: string]: any };

/**
 * 
 * 解析参数，
 * 将对象转换成obj[a]的形式
 * 将数组转换成obj[]的形式
 */
export function parseParams(_data: { [key: string]: any }, prefix: string = '') {

    let data: { [key: string]: any } = {};
    for (let key in _data) {
        let _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data = Object.assign({}, data, parseParams(_data[key], _key));
        } else {
            data[_key] = _data[key]
        }
    }
    return data;
}
/**
 * 将参数转换为string
 */
export function paramstoQuery(_data: { [key: string]: any }): string {
    let querystring: Array<string> = [];
    for (let key in _data) {
        if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (let value of _data[key]) {
                querystring.push(key + '[]=' + value);
            }
        } else {
            querystring.push(key + '=' + _data[key]);
        }
    }
    return querystring.join('&');
}
/**
 * 将参数转换为formdata
 */
function paramstoFormData(_data: { [key: string]: any }): FormData {

    let formData = new FormData();
    console.log(_data)
    for (let key in _data) {
        if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (let value of _data[key]) {
                formData.append(key + '[]', value);
                console.log(key + '[]', value)
            }
        } else {
            console.log(key , _data[key])
            formData.append(key, _data[key]);
        }
    }
    return formData;
}
function parseString2Object(str: string = ''): { [key: string]: string } {
    let data: { [key: string]: string } = {};
    str.split('&').forEach(item => {
        let index = item.indexOf('=');
        if (index != -1) {
            data[item.substring(0, index)] = item.substr(index + 1).trim();
        }
    })
    return data;
}
function object2formData(obj: { [key: string]: string }): FormData {
    let data = new FormData();
    for (let key in obj) {
        data.append(key, obj[key]);
    }
    return data;
}
export function doRequest(_options: RequestOptions): Promise<Response> {
    return new Promise((resolve, reject) => {


        let { url = '', method, body: _body, headers = {}, onRequest, onResponse, mode = 'no-cors', isFetch = true } = _options;
        let body: any={};
        //参数请求前处理
        if (onRequest) {
            _body = onRequest(_body);
        }
        if (method.toLocaleUpperCase() == 'GET' && _body) {
            switch (headers['Content-Type']) {
                case 'multipart/form-data':
                    if (_body instanceof FormData) {
                        body = _body;
                    } else if (typeof _body == 'string') {
                        body = object2formData(parseString2Object(_body));
                    } else if (typeof _body == 'object') {
                        body = parseParams(_body);
                        console.log(body,111)
                    } else {
                        break;
                    }
                    break;
                case 'text/xml':

                    break;
                case 'application/json':
                    break;
                case 'application/x-www-form-urlencoded':
                default:

                    break;
            }
        }
        if ('fetch' in window && isFetch) {
            fetch(_options.url, {
                method: _options.method,
                headers,
                mode,
                body: paramstoFormData(body)
            }).then((res: Response) => {
                if (onResponse) {
                    res = onResponse(res);
                }
                resolve(res);
            }).catch((err) => {
                reject(err)
            })
        } else {
            let xmlHttp: XMLHttpRequest;
            //IE7以上
            if ('XMLHttpRequest' in window) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlHttp.onreadystatechange = () => {
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
                    let res = new Response(xmlHttp.responseText, {
                        headers
                    });
                    resolve(res);
                } catch (err) {
                    reject(err)
                }
            }
            xmlHttp.open(method, url, true);
            xmlHttp.send(paramstoFormData(body));
        }
    })
}