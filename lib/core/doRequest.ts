import Request, { RequestMode } from './Request';
import Response from './Response';
import Headers from './Headers';
import helper from '../helper';
import configs from './config';
import qs from 'qs';

export interface OnRequestOption {
    url: string,
    headers: Headers,
    timeout: number | null,
    data: { [index: string]: any },
    params: { [index: string]: any },
}
export interface ProgressEvent extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
}
export interface AdapterOption {
    onDownloadProgress?: (progressEvent: ProgressEvent) => any,
    onUploadProgress?: (progressEvent: ProgressEvent) => any,
    adapter?: 'fetch' | 'xhr',
    timeout?: number | null,
    request: Request,
}
export interface RequestOption {
    //基地址
    baseUrl: string,
    url: string,
    method: string,
    adapter?: 'fetch' | 'xhr',
    //请求发送之前的回调
    onRequest?: (req: OnRequestOption) => any,
    headers: {
        [key: string]: string
    },
    //请求响应之后回调
    onResponse?: (res: Response) => any,
    onDownloadProgress?: (progressEvent: ProgressEvent) => any,
    onUploadProgress?: (progressEvent: ProgressEvent) => any,
    mode?: RequestMode,
    timeout?: number | null,
    data: { [index: string]: any },
    params: { [index: string]: any },
}
export default function doRequest(config: RequestOption): Promise<any> {

    if (config.baseUrl && !helper.isAbsoluteURL(config.url)) {
        config.url = helper.joinUrl(config.baseUrl, config.url);
    }
    let request: OnRequestOption = {
        url: config.url,
        headers: new Headers(config.headers || {}),
        data: helper.isObject(config.data) ? config.data : {},
        params: helper.isObject(config.params) ? config.params : {},
        timeout: config.timeout && config.timeout > 0 ? config.timeout : 4000,
    };
    //请求拦截器
    if (config.onRequest && helper.isFunction(config.onRequest)) {
        config.onRequest(request);
        request.url = request.url + (request.url.indexOf('?') == -1 ? '?' : '&') + qs.stringify(request.params);
    }
    const options: AdapterOption = {
        onDownloadProgress: config.onDownloadProgress,
        onUploadProgress: config.onUploadProgress,
        adapter: config.adapter,
        timeout: request.timeout,
        request: new Request(request.url, {
            body: request.data,
            headers: request.headers,
            method: config.method,
            mode: config.mode,
        }),
    };
    //获取合适的适配器
    let adapter: any = configs.getAdapter(options);
    return adapter(options).then((res: Response) => {

        //响应拦截器
        if (config.onResponse && helper.isFunction(config.onResponse)) {
            return config.onResponse(res);
        }
    });

}