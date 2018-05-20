import { doRequest,Body } from './fetch';
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
    private _request(options: { url: string, method: string, type?: 'request' | 'upload' | 'download' }) {
        return function (data: Body): Promise<Response> {
            return doRequest({
                ...options,
                body: data,
            });
        }
    }
    public get(url: string): Function {

        return this._request({
            url,
            method: 'get'
        })
    }
    public post(url: string): Function {
        return this._request({
            url,
            method: 'post'
        })
    }
    public delete(url: string): Function {
        return this._request({
            url,
            method: 'delete'
        })
    }
    public patch(url: string): Function {
        return this._request({
            url,
            method: 'patch'
        })
    }
    public put(url: string): Function {
        return this._request({
            url,
            method: 'put'
        })
    }
    public upload(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' }): Function {
        return this._request({
            url,
            method: options.method,
            type: 'upload'
        })
    }
    public download(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' }): Function {
        return this._request({
            url,
            method: options.method,
            type: "download"
        })
    }
    public request(options: { url: string, method: string }): Function {
        return this._request(options)
    }
}

export function upload({ url = '', method = 'POST', ...options }: {
    url: string,
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
}, callback?: Function): Promise<Response> {
    return doRequest({
        url,
        method,
        ...options,
        type: 'upload',
        callback
    });
}
export function download({ url = '', method = 'GET', ...options }: {
    url: string,
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object
}, callback: Function): Promise<Response> {
    return doRequest({
        url,
        method,
        ...options,
        type: 'download',
        callback,
    });
}
export function request({ url = '', method = 'GET', ...options }: { url: string, method?: string, body?: Object,headers?:any }): Promise<Response> {
    return doRequest({
        ...options,
        url,
        method
    });
}