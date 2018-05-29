import CRequest from './request';
/**
 * charm-fetch实例配置参数
 */
interface CreateOption {
    //基地址
    url: string,
    //请求发送之前的回调
    onRequest?: Function,
    headers?: {
        [key: string]: string
    },
    //请求响应回调
    onResponse?: Function,
    mode?: "no-cors" | "cors",
    timeout: number
}
/**
 * fetch传递参数
 */
interface FetchOption {
    //基地址
    url: string,
    headers: Object,
    body: {
        [key: string]: string
    }
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
     * 创建实例 存在实例就会删除实例再重新创建实例
     */
    static create(key: string, options: CreateOption): Fetch {
        this.instances[key] = new Fetch(options);
        return this.instances[key];
    }

    static upload({ url = '', method = 'POST', ...options }: {
        url: string,
        method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    }, callback?: Function): Promise<Response> {
        return new CRequest({
            ...options,
            method,
            type: 'upload',
            url,
            callback,
            isFetch: false
        }).request();
    }
    static download({ url = '', method = 'GET', ...options }: {
        url: string,
        method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
        body?: Object
    }, callback: Function): Promise<Response> {
        return new CRequest({
            ...options,
            url,
            method,
            type: 'download',
            callback,
            isFetch: false
        }).request();
    }
    static querystring(options: { [index: string]: string }): string {
        return new CRequest({
            ...options,
            method: 'GET'
        }).querystring();
    }
    static request({ url = '', method = 'GET', ...options }: { url: string, method?: string, body?: Object, headers?: any }): Promise<Response> {
        return new CRequest({
            ...options,
            url,
            method,
            type: 'request'
        }).request();
    }
}

class Fetch {

    //将参数保存到私有的属性中
    constructor(private _options: CreateOption) {
    }
    private joinUrl(url: string): string {

        if (/^(https?:)?\/\//.test(url)) {
            return url;
        }
        //去除多余的/ 保留一个即可
        return this._options.url + url;
    }
    //请求数据
    private _request(options: { url: string, method: string, type?: 'request' | 'upload' | 'download', isFetch?: boolean }) {

        return (data: Body, callback: Function): Promise<Response> => {
            return new CRequest({
                ...this._options,
                ...options,
                type:"request",
                body: data,
                callback,
            }).request();
        }
    }
    public querystring(body: { [index: string]: string }): string {
        return new CRequest({
            ...this._options,
            method: 'GET',
            body
        }).querystring();
    }
    public get(url: string, options: { [index: string]: string | Function | Boolean | Number }={}): Function {

        return this._request({
            ...options,
            url: this.joinUrl(url),
            method: 'get',
        })
    }
    public post(url: string, options: { [index: string]: string | Function | Boolean | Number }={}): Function {
        return this._request({
            ...options,
            method: 'post',
            url: this.joinUrl(url),
        })
    }
    public delete(url: string, options: { [index: string]: string | Function | Boolean | Number }={}): Function {
        return this._request({
            ...options,
            method: 'delete',
            url: this.joinUrl(url),
        })
    }
    public patch(url: string, options: { [index: string]: string | Function | Boolean | Number }= { }): Function {
        return this._request({
            ...options,
            url: this.joinUrl(url),
            method: 'patch',
        })
    }
    public put(url: string, options: { [index: string]: string | Function | Boolean | Number }={}): Function {
        return this._request({
            ...options,
            url: this.joinUrl(url),
            method: 'put',
        })
    }
    public upload(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE', [index: string]: string | Function | Boolean | Number } = { method: 'POST' }): Function {

        return this._request({
            ...options,
            url: this.joinUrl(url),
            method: options.method || 'POST',
            type: 'upload',
            isFetch: false
        })
    }
    public download(url: string, options: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' }= { method: 'POST' }): Function {
        return this._request({
            ...options,
            method: options.method || 'POST',
            type: "download",
            url: this.joinUrl(url),
            isFetch: false
        })
    }
    public request(options: { url: string, method: string }): Function {
        return this._request({
            ...options,
            type: "request"
        })
    }
}
