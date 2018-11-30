import Body from "./body";
import Headers from './headers';

export default class Response extends Body {
    public readonly type: string;
    public readonly status: number;
    public readonly ok: boolean;
    public readonly statusText: string;
    public readonly headers: Headers;
    public readonly url: string;
    constructor(bodyInit: any, options: {
        status: number,
        type?: string,
        headers?: Headers,
        url?: string,
        statusText: string
    }) {
        super();
        this._initBody(bodyInit, options)
        this.type = options.type || 'default';
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
        this.url = options.url || ''
    }
    public clone(res: Response) {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url,
            type: 'default'
        });
    }
    public static error() {
        var response = new Response(null, {
            status: 0,
            statusText: '',
            type: 'error',
        })
        return response;
    }
}