import CRequest from './request';
/**
 * charm-fetch实例配置参数
 */
interface CreateOption {
    //基地址
    url: string,
    //请求发送之前的回调
    request?: Function,
    //请求响应回调
    response?: Function,
}
/**
 * fetch传递参数
 */
interface FetchOption {
    //基地址
    url: string,
    header: Object,

}
export default class CFetch {

    /**
     * 实例数组  可以有多个fetch对象
     */
    private static instances: {
        [index: string]: Fetch
    } = {};
    /**
     * 根据指定的key获取实例
     */
    static getInstance(key: string) {
        return this.instances[key] || null;
    }
    /**
     * 
     * 创建实例
     */
    static create(key: string, options: CreateOption): Fetch {

        this.instances[key] = new Fetch(options);
        return this.instances[key];
    }
}
class Fetch {

    private _url: string;
    private _requestCallBack?: Function;
    private _responseCallBack?: Function;
    constructor(options: CreateOption) {
        this._url = options.url;
        this._requestCallBack = options.request;
        this._responseCallBack = options.response;
    }
    public get(url: string): Promise<any> {
        return function (data: Object):Promise<any>  {
            return new CRequest({ url, method: 'post' });
        }
    }
    public post(url: string): Function {
        return function (data: Object): Promise<any> {
            return request({
                url,
                method: 'post',
                body: data
            });
        }
    }
    public delete(url: string): Function {
        return function (data: Object): Promise<any> {
            return request({
                url,
                method: 'delete',
                body: data
            });
        }
    }
    public patch(url: string): Function {
        return function (data: Object): Promise<any> {
            return request({
                url,
                method: 'patch',
                body: data
            });
        }
    }
    public put(url: string): Function {
        return function (data: Object): Promise<any> {
            return request({
                url,
                method: 'patch',
                body: data
            });
        }
    }
    public upload(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' }): Function {
        return function (data: Object): Promise<any> {
            return upload({ url, ...options });
        }
    }
    public download(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' }): Function {
        return function (data: Object, callback: Function): Promise<any> {
            return download({ url, ...options, body: data }, callback);
        }
    }
    public request(options: { url: string }): Function {
        return function (data: Object) {
            request({
                ...options,
                method: 'patch',
                body: data
            });
        }
    }
}

export function upload(options: {
    url: string,
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
}, callback?: Function): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {

    });
}
export function download(options: {
    url: string,
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object
}, callback: Function): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {

    });
}
export function request({ url, method = 'GET', ...options }: { url: string, method?: string, body?: Object }): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {

        //存在fetch就是使用fetch 
        if ('fetch' in window) {
            fetch(url, {
                method,
                // ...options
            }).then((res: Response) => resolve(res.body)).catch((err) => {
                reject(err)
            })
        } else {
            let xmlHttp: XMLHttpRequest;
            //IE7以上
            if (window.XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlHttp.onreadystatechange = function () {
                resolve(xmlHttp)
            }
            xmlHttp.open(method, url, true);
            xmlHttp.send();
        }
    })
}