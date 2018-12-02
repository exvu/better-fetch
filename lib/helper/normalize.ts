const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

/**
 * 规范键名
 * @param name 
 */
function normalizeHeadersKey(name: string) {
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
function normalizeHeadersValue(value: string) {
    if (typeof value !== 'string') {
        value = String(value)
    }
    return value
}
/**
 * 规范方法名
 * @param name 
 */
function normalizeMethod(method: string) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
}
export default {
    normalizeHeadersKey,
    normalizeHeadersValue,
    normalizeMethod,
}