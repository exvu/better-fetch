
/**
 * 规范键名
 * @param name 
 */
export function normalizeName(name: string) {
    if (typeof name !== 'string') {
        name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
}
/**
 * 规范键值
 * @param name 
 */
export function normalizeValue(value: string) {
    if (typeof value !== 'string') {
        value = String(value)
    }
    return value
}
const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

/**
 * 规范方法名
 * @param name 
 */
export function normalizeMethod(method: string) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
}
/**
 * 判断是否支持某些特性
 * @param name 
 */
export const support = {
    blob: 'FileReader' in window && 'Blob' in window && (function () {
        try {
            new Blob();
            return true
        } catch (e) {
            return false
        }
    })(),
    formData: 'FormData' in window,
    arrayBuffer: 'ArrayBuffer' in window
}
export function readBlobAsArrayBuffer(blob: any) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
}
export function fileReaderReady(reader: FileReader) {
    return new Promise(function (resolve: any, reject) {
        reader.onload = function () {
            resolve(reader.result)
        }
        reader.onerror = function () {
            reject(reader.error)
        }
    })
}

export function readBlobAsText(blob: any, options: any) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if (_charset) {
        args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
}
/**
 * url编码
 * @param body 
 */
export function decode(body: any) {
    var form = new FormData()
    body.trim().split('&').forEach(function (bytes: any) {
        if (bytes) {
            var split = bytes.split('=')
            var name = split.shift().replace(/\+/g, ' ')
            var value = split.join('=').replace(/\+/g, ' ')
            form.append(decodeURIComponent(name), decodeURIComponent(value))
        }
    })
    return form
}

/**
 * 解析参数，
 * 将对象转换成obj[a]的形式
 * 将数组转换成obj[0]的形式
 */
function parseParams(_data: { [key: string]: any }, prefix: string = '') {
    let data: Array<Array<any>> = [];
    for (let key in _data) {
        if (_data[key] == undefined || _data[key] == null) {
            continue;
        }
        let _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data.push(...parseParams(_data[key], _key));
        } else if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (let i in _data[key]) {
                let v = _data[key][i];
                if (typeof v == 'object') {
                    data.push(...parseParams(v, _key + '[' + i + ']'));
                } else {
                    data.push([_key + '[' + i + ']', v]);
                }
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
export function object2query(_data: { [key: string]: any }): string {

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
/**
 * 是否包含文件
 * @param data
 */
export function isIncloudFile(data: any): boolean {
    let flag = false;
    if (typeof data == 'object') {
        let keys = Object.getOwnPropertyNames(data);
        for (let key of keys) {
            if (data[key] instanceof File) {
                return true;
            } else if (typeof data[key] == 'object') {
                flag = isIncloudFile(data[key]);
                if (flag) {
                    return true;
                }
            }
        }
    }
    return flag;
}