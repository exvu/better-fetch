import Response from './response';
import helper from '../helper'
import doRequest, { OnRequestOption } from './doRequest';
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
export interface Option {
    url?: string,
    method?: string,
    headers?: {
        [key: string]: string
    },
}
interface Params {
    [propName: string]: any
}
class Http {

    constructor(private  options: CreateOption) {
    }
    /**
     * 获取url
     * @param url 
     * @param params 
     * @param config 
     */
    public url(url: string, params: {[index:string]:string}) {
        const config = helper.mergeConfig(this.options, {
            params,
            url:url.toString(),
        });
        if (config.baseUrl && !helper.isAbsoluteURL(config.url)) {
            config.url = helper.joinUrl(config.baseUrl, config.url);
        }
        return helper.buildUrl(config.url, params);

    }
    public request(config: any) {
        config = helper.mergeConfig(this.options, config);
        config = helper.filter(config, [
            'baseUrl', 'onRequest', 'onResponse', 'timeout', 'headers', 'data', 'params',
            'onDownloadProgress', 'onUploadProgress', 'adapter', 'url', 'method', 'mode',
        ]);
        return doRequest(config);
    }
}
/**
 * 根据mdn文档 设置get ,head options 不能传递body
 */
['get', 'head', 'options'].forEach(method => {
    (<Params>Http).prototype[method] = function (url: string, options: Option) {
        return this.request({
            ...options,
            method,
            url
        });
    }
});
['post', 'put', 'patch', 'delete'].forEach(method => {
    (<Params>Http).prototype[method] = function (url: string, data: any, options: Option) {
        return this.request({
            ...options,
            method,
            data,
            url
        });
    }
})
export default Http;