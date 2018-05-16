
export default class CRequest {


    constructor(options: { url: string, method: string, type?: 'request' }) {
    }
    private _bind: any;
    /**
     * 连贯操作
     */
    public then() {

    }
    /**
     * 异常捕获
     */
    public catch() {

    }
    /**
     * 结束请求
     */
    public abort() {

    }
    /**
     * 当使用then方法时绑定对象
     * 当对象被销毁时，就终止请求
     */
    public bind(ref: any) {
        this._bind = ref;
    }
    /**
     *当使用await/async时绑定对象
     *可以根据将回调参数调用abort 实现终止请求
     */
    public ref(callback: Function) {
        callback(this)
    }
}