
import Headers from './header';
import { normalizeMethod } from './helper';
import Body from './body';
export interface RequestInit {
    headers?: Headers,
    body?: RequestBody,
    bodyUsed?: boolean,
    url?: string,
    method?: string,
    mode?: RequestMode,
}
export type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
export type RequestBody = Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | string | null | { [index: string]: string }
export default class Request extends Body {

    public readonly headers: Headers = new Headers({});
    public readonly method: string = 'GET';
    public readonly mode: RequestMode = 'no-cors';
    public readonly body: RequestBody;
    public url: string;
    public bodyUsed: boolean = false;
    public constructor(input: Request | string, options: RequestInit = {}) {
        super();
        this.body = options.body || null;
        if (input instanceof Request) {
            if (options.bodyUsed) {
                throw new TypeError('Already read')
            }
            this.url = options.url || '';
            this.method = options.method || '';
            this.mode = options.mode || "no-cors";
            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }
            if (!this.body) {
                this.body = input.body
                input.bodyUsed = true
            }
        } else {
            this.url = input;
        }
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET')
        this.mode = options.mode || this.mode || null;
        if ((this.method === 'GET' || this.method === 'HEAD') && this.body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(this.body, options);
    }

    public clone(target: Request) {
        return new Request(this);
    }
}