export function normalizeName(name: string) {
    if (typeof name !== 'string') {
        name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
}

export function normalizeValue(value: string) {
    if (typeof value !== 'string') {
        value = String(value)
    }
    return value
}
const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

export function normalizeMethod(method: string) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
}

let window = {
    blob: 1,
    formData:1,
    arrayBuffer: 1
}
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
    return new Promise(function (resolve, reject) {
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
