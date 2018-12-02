
function getType(obj: any) {
    return Object.prototype.toString.call(obj);
}
function isNumber(value: any) {
    return getType(value) === '[object Number]';
}
function isArray(value: any) {
    return getType(value) === '[object Array]';
}
function isArrayBuffer(value: any) {
    return getType(value) === '[object ArrayBuffer]';
}
function isFormData(value: any) {
    return getType(value) === '[object FormData]';
}
function isString(value: any) {
    return typeof value === 'string';
}
function isUndefined(value: any) {
    return typeof value === 'undefined';
}
function isObject(value: any) {
    return value !== null && typeof value === 'object';
}
function isDate(value: any) {
    return toString.call(value) === '[object Date]';
}

function isFile(value: any) {
    return toString.call(value) === '[object File]';
}
function isBlob(value: any) {
    return toString.call(value) === '[object Blob]';
}
function isFunction(value: any) {
    return toString.call(value) === '[object Function]';
}
function isStream(value: any) {
    return isObject(value) && isFunction(value.pipe);
}

function isURLSearchParams(value: any) {
    return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}

export default {
    isArray,
    isArrayBuffer,
    isBlob,
    isDate,
    isFile,
    isFormData,
    isFunction,
    isNumber,
    isObject,
    isStream,
    isString,
    isURLSearchParams,
    isUndefined,
}