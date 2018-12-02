import checkType from './checkType';

function forEach(obj: any, callback: Function) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  } if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (checkType.isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      callback.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        callback.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * 合并多个对象
 */
function merge(..._arguments: any) {
  const obj: { [index: string]: any } = {};
  for (let i = 0; i < _arguments.length; i++) {
    forEach(_arguments[i], function (val: any, key: string) {
      if (typeof obj[key] === 'object' && typeof val === 'object') {
        obj[key] = merge(obj[key], val);
      } else {
        obj[key] = val;
      }
    });
  }
  return obj;
}
/**
 * 合并多个对象
 */
function deepMerge(..._arguments: any) {
  const obj: { [index: string]: any } = {};
  for (let i = 0; i < _arguments.length; i++) {
    forEach(_arguments[i], function (val: any, key: string) {
      if (!(checkType.isObject(obj[key]))) {
        obj[key] = {};
      }
      if (checkType.isObject(val)) {
        obj[key] = deepMerge(obj[key], val);
      } else {
        obj[key] = val;
      }
    });
  }
  return obj;
}
function mergeConfig(..._arguments: any) {
  const config: { [index: string]: any } = {};
  for (let i = 0; i < _arguments.length; i++) {
    forEach(_arguments[i], function (_config: any) {
      //合并url，data，params
      forEach(['url', 'method', 'data', 'params'], function (prop: string) {
        if (typeof _config[prop] !== 'undefined') {
          config[prop] = _config[prop];
        }
      });
      forEach(['headers', 'auth', 'proxy'], function (prop: string) {
        if (checkType.isObject(_config[prop])) {
          config[prop] = deepMerge(config[prop], _config[prop]);
        } else if (typeof _config[prop] !== 'undefined') {
          config[prop] = _config[prop];
        }
      });

      forEach([
        'baseURL', 'onRequest', 'onResponse', 'paramsSerializer',
        'timeout',
      ], function (prop: string) {
        if (typeof _config[prop] !== 'undefined') {
          config[prop] = _config[prop];
        } else if (typeof _config[prop] !== 'undefined') {
          config[prop] = _config[prop];
        }
      });
    });
  }
  return config;
}
function trim(str: string) {
  if (!checkType.isString(str)) {
    throw new TypeError('value type not string');
  }
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * url编码
 * @param body 
 */
function decode(body: any) {
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
* 将参数转换为formdata
*/
function params2FormData(_data: { [key: string]: any }): FormData {

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
function isIncloudFile(data: any): boolean {
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
function isAbsoluteURL(url:string) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

function joinUrl(prefix:string, url:string) {
  return url
    ? prefix.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
    : prefix;
};
export default {
  merge,
  forEach,
  mergeConfig,
  deepMerge,
  trim,
  isIncloudFile,
  params2FormData,
  decode,
  parseParams,
  isAbsoluteURL,
  joinUrl
}