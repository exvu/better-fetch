window.CApi=function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}([function(t,e,r){"use strict";e.__esModule=!0,e.normalizeKey=function(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()},e.normalizeValue=function(t){return"string"!=typeof t&&(t=String(t)),t};var o=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function n(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function a(t,e){void 0===e&&(e="");var r=[];for(var o in t)if(void 0!=t[o]&&null!=t[o]){var n=""==e?o:e+"["+o+"]";if("[object Object]"==Object.prototype.toString.call(t[o]))r.push.apply(r,a(t[o],n));else if("[object Array]"==Object.prototype.toString.call(t[o]))for(var i in t[o]){var s=t[o][i];"object"==typeof s?r.push.apply(r,a(s,n+"["+i+"]")):r.push([n+"["+i+"]",s])}else r.push([n,t[o]])}return r}e.normalizeMethod=function(t){var e=t.toUpperCase();return o.indexOf(e)>-1?e:t},e.support={blob:"FileReader"in window&&"Blob"in window&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in window,arrayBuffer:"ArrayBuffer"in window},e.readBlobAsArrayBuffer=function(t){var e=new FileReader;return e.readAsArrayBuffer(t),n(e)},e.fileReaderReady=n,e.readBlobAsText=function(t,e){var r=new FileReader,o=e.headers.map["content-type"]?e.headers.map["content-type"].toString():"",a=/charset\=[0-9a-zA-Z\-\_]*;?/,i=t.type.match(a)||o.match(a),s=[t];return i&&s.push(i[0].replace(/^charset\=/,"").replace(/;$/,"")),r.readAsText.apply(r,s),n(r)},e.decode=function(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e},e.object2query=function(t){return a(t).map(function(t){return t.join("=")}).join("&")},e.params2FormData=function(t){for(var e=a(t),r=new FormData,o=0,n=e;o<n.length;o++){var i=n[o];r.append(i[0],i[1])}return r},e.isIncloudFile=function t(e){var r=!1;if("object"==typeof e)for(var o=0,n=Object.getOwnPropertyNames(e);o<n.length;o++){var a=n[o];if(e[a]instanceof File)return!0;if("object"==typeof e[a]&&(r=t(e[a])))return!0}return r}},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0),n=function(){function t(e){var r=this;(this.map={},e instanceof t)?e.entries().forEach(function(t){var e=t[0],o=t[1];r.append(e,o)}):e&&Object.getOwnPropertyNames(e).forEach(function(t){r.append(t,e[t])})}return t.prototype.append=function(t,e){t=o.normalizeKey(t),e=o.normalizeValue(e);var r=this.map[t];r||(r=[],this.map[t]=r),r.push(e)},t.prototype.delete=function(t){delete this.map[o.normalizeKey(t)]},t.prototype.entries=function(){var t=[];for(var e in this.map)t.push([e,this.map[e].join(";")]);return t},t.prototype.get=function(t){var e=this.map[o.normalizeKey(t)];return e?e[0]:null},t.prototype.has=function(t){return this.map.hasOwnProperty(o.normalizeKey(t))},t.prototype.set=function(t,e){this.map[o.normalizeKey(t)]=[o.normalizeValue(e)]},t.prototype.keys=function(){return Object.keys(this.map)},t.prototype.values=function(){var t=[];for(var e in this.map)t.push(this.map[e].join(";"));return t},t}();e.default=n},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0),n=function(){function t(){this.bodyUsed=!1,this._bodyText="",this._bodyBlob=null,this._bodyFormData=null}return t.prototype._initBody=function(t,e){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(o.support.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t||null,this._options=e;else if(o.support.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t||null;else if(t){if(!o.support.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText=""},t.prototype.blob=function(){var e=this;return new Promise(function(r,o){var n=t.consumed(e);return n&&o(n),e._bodyBlob?r(e._bodyBlob):e._bodyFormData?o(new Error("could not read FormData body as blob")):r(new Blob([e._bodyText]))})},t.prototype.arrayBuffer=function(){return this.blob().then(o.readBlobAsArrayBuffer)},t.prototype.formData=function(){this.formData=function(){return this.text().then(o.decode)}},t.prototype.json=function(){return this.text().then(JSON.parse)},t.prototype.text=function(){var e=this;return new Promise(function(r,n){var a=t.consumed(e);return a&&n(a),e._bodyBlob?o.readBlobAsText(e._bodyBlob,e._options):e._bodyFormData?n(new Error("could not read FormData body as text")):r(e._bodyText)})},t.consumed=function(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0},t}();e.default=n},function(t,e,r){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var a=n(r(1)),i=r(0),s=function(t){function e(r,o){void 0===o&&(o={});var n=t.call(this)||this;if(n.headers=new a.default({}),n.method="GET",n.mode="no-cors",n.bodyUsed=!1,n.body=o.body||null,r instanceof e){if(o.bodyUsed)throw new TypeError("Already read");n.url=o.url||"",n.method=o.method||"",n.mode=o.mode||"no-cors",o.headers||(n.headers=new a.default(r.headers)),n.body||(n.body=r.body,r.bodyUsed=!0)}else n.url=r;if(!o.headers&&n.headers||(n.headers=new a.default(o.headers)),n.method=i.normalizeMethod(o.method||n.method||"GET"),n.mode=o.mode||n.mode||null,("GET"===n.method||"HEAD"===n.method)&&n.body)throw new TypeError("Body not allowed for GET or HEAD requests");return n._initBody(n.body,o),n}return o(e,t),e.prototype.clone=function(t){return new e(this)},e}(n(r(2)).default);e.default=s},function(t,e,r){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var a=n(r(2)),i=n(r(1)),s=function(t){function e(e,r){var o=t.call(this)||this;return o._initBody(e,r),o.type=r.type||"default",o.status=r.status,o.ok=o.status>=200&&o.status<300,o.statusText=r.statusText,o.headers=r.headers instanceof i.default?r.headers:new i.default(r.headers),o.url=r.url||"",o}return o(e,t),e.prototype.clone=function(t){return new e(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new i.default(this.headers),url:this.url,type:"default"})},e.error=function(){return new e(null,{status:0,statusText:"",type:"error"})},e}(a.default);e.default=s},function(t,e,r){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var n=o(r(6));e.default=n.default;var a=r(0);e.object2query=a.object2query,e.params2FormData=a.params2FormData;var i=r(1);e.Headers=i.default;var s=r(4);e.Respnse=s.default;var u=r(3);e.Request=u.default;var d=r(2);e.Body=d.default},function(t,e,r){"use strict";var o=this&&this.__assign||Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t};e.__esModule=!0;var n=r(7),a=r(0),i=function(){function t(e,r){this._options=r,t._instances[e]=this}return t.getInstance=function(e){return t._instances[e]},t.removeInstance=function(e){delete t._instances[e]},t.prototype.joinUrl=function(t){return/^(https?:)?\/\//.test(t)?this.build(t):this.build(this._options.baseUrl+t)},t.prototype.build=function(t){return t.replace(/([^(https?:)])(\/)+/gi,"$1/")},t.prototype.querystring=function(t){return this.joinUrl(t)},t.prototype.get=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),this._request(t,"get",o({},r,{data:e}))},t.prototype.post=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),this._request(t,"post",o({},r,{data:e}))},t.prototype.delete=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),this._request(t,"delete",o({},r,{data:e}))},t.prototype.put=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),this._request(t,"put",o({},r,{data:e}))},t.prototype.patch=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),this._request(t,"patch",o({},r,{data:e}))},t.prototype._request=function(t,e,r){return n.doRequest(this.joinUrl(t),o({},this._options,r,{headers:o({},this._options.headers,r.headers),method:e}))},t.object2query=function(t){return a.object2query(t)},t.params2FormData=function(t){return a.params2FormData(t)},t._instances={},t}();e.default=i},function(t,e,r){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var n=o(r(3)),a=o(r(4)),i=o(r(1)),s=r(0);function u(t){return t.replace(/([^(https?:)])(\/)+/gi,"$1/")}function d(t,e){var r=e.onResponse,o=e.timeout,n=e.xhr;return new Promise(function(e,s){try{var u;if(u="XMLHttpRequest"in window?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),o&&(u.timeout=o),u.open(t.method,t.url,!0),n&&("[object Function]"!=Object.prototype.toString.call(n)?s("xhr必须是函数"):n(u)),t.headers)t.headers.entries().forEach(function(t){var e=t[0],r=t[1];u.setRequestHeader(e,r)});u.onreadystatechange=u.onload=function(){try{if(4!=u.readyState)return;var t={};u.getAllResponseHeaders().split("\n").forEach(function(e){var r=e.indexOf(":");-1!=r&&(t[e.substring(0,r)]=e.substr(r+1).trim())});var o=new a.default(u.responseText,{headers:new i.default(t),status:u.status,statusText:u.statusText}),n=r(o);n||s("onResponse must return"),e(n)}catch(t){s(t)}},u.onerror=function(t){s(t)},u.send(t._bodyInit||null)}catch(t){s(t)}})}e.buildUrl=u,e.doRequest=function(t,e){var r,o=e.method,a=e.headers,p=e.mode,c=e.onResponse,f=e.onRequest,l=e.timeout,h=e.data,y=e.xhr,m={url:u(t),headers:new i.default(a),mode:p,data:h};if(f(m),!m.headers.get("Content-Type"))if("object"!=typeof m.data)try{m.data=JSON.parse(m.data),m.headers.set("Content-Type","application/json")}catch(t){m.headers.set("Content-Type","text/plain")}else s.isIncloudFile(h)?m.headers.set("Content-Type","multipart/form-data"):m.headers.set("Content-Type","application/x-www-form-urlencoded");var b=m.headers.get("Content-Type")||"",_=-1!=b.indexOf(";")?b.substring(0,b):b;if("get"!==o.toLocaleLowerCase())switch(_){case"application/json":try{if("string"==typeof m.data)r=JSON.parse(m.data);else{if("object"!=typeof h)throw new Error("application/json allow data type json string or object");r=JSON.stringify(m.data)}}catch(t){throw new Error("application/json allow data type json string  or object")}break;case"application/x-www-form-urlencoded":if("object"!=typeof m.data)throw new Error("application/x-www-form-urlencoded  allow data type object");r=s.object2query(m.data);break;case"multipart/form-data":if("object"!=typeof m.data)throw new Error("multipart/form-data allow  data type object");r=s.params2FormData(m.data),m.headers.delete("content-type");break;case"text/plain":default:"string"!=typeof h&&(r=JSON.stringify(h))}return d(new n.default(m.url+(-1==m.url.indexOf("?")?"?":"&")+"_r="+Math.random(),{method:o,headers:m.headers,mode:m.mode,body:"GET"==o.toLocaleUpperCase()?null:r}),{onResponse:c,timeout:l,xhr:y})},e.doXmlHttpRequest=d}]).default;