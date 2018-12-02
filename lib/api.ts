import Request from './core/Request';
import { OnRequestOption } from './core/doRequest';
import Response from './core/Response';
import Http from './core/Http';
/**
 * charm-Api实例配置参数
 */
export interface CreateOption {
    //基地址
    baseUrl: string,
    //请求发送之前的回调
    onRequest?: (req: OnRequestOption, data: any) => any,
    headers?: {
        [key: string]: string
    },
    //请求响应之后回调
    onResponse?: (res: Response) => any,
    mode?: "no-cors" | "cors",
    timeout?: number,
}
export default class Api extends Http {
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
    constructor(key: string, _options: CreateOption) {
        super(_options);
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
}