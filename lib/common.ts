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