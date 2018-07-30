import { doRequest } from './charm-request';
import Request from './request';
import Response from './response';
/**
 * charm-Api实例配置参数
 */
interface CreateOption {
    //基地址
    baseUrl: string,
    //请求发送之前的回调
    onRequest?: (req: Request, data: any) => any,
    headers?: {
        [key: string]: string
    },
    //请求响应之后回调
    onResponse?: (res: Response) => any,
    mode?: "no-cors" | "cors",
    timeout?: number,
}
export default class Api {
    /**
     * 实例容器
     */
    protected static _instances: {
        [index: string]: Api
    } = {};
    /**
     * 
     * @param key 实例唯一键
     * @param _options 配置参数 createOption
     */
    constructor(key: string, private _options: CreateOption) {
        Api._instances[key] = this;
    }
    /**
     * 获取实例
     * @param key 实例唯一键
     */
    public static getInstance(key: string) {
        return Api._instances[key];
    }
    /**
     * 删除实例 实例唯一键
     * @param key 
     */
    public static removeInstance(key: string) {
        delete Api._instances[key];
    }
    /**
     * 拼接url,当url以http|https开头的不拼接baseUrl
     * @param url url
     */
    private joinUrl(url: string): string {

        if (/^(https?:)?\/\//.test(url)) {
            return this.build(url);
        }
        //去除多余的/ 保留一个即可
        return this.build(this._options.baseUrl + url);
    }
    private build(url: string) {
        return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\//, "\/");
    }
    /**
     * 获取请求的url
     * @param body 
     */
    public querystring(url: string): string {
        return this.joinUrl(url);
    }
    public get(url: string, data: any = '', options: { [index: string]: any } = {}) {
        return this._request(url, 'get', {
            ...options,
            data
        });
    }
    public post(url: string, data: any = '', options: { [index: string]: any } = {}) {
        return this._request(url, 'post', {
            ...options,
            data
        });
    }
    private _request(url: string, method: string, options: any) {

        return doRequest(this.joinUrl(url), {
            ...this._options,
            ...options,
            //合并header
            headers: {
                ...this._options.headers,
                ...options.headers,
            },
            method
        });
    }
}