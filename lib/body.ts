import { support, readBlobAsArrayBuffer, readBlobAsText, decode } from './common';

export default class Body {

    public bodyUsed: boolean = false;
    protected _bodyInit: any;
    protected _bodyText: string = '';
    protected _bodyBlob: Blob | null = null;
    protected _bodyFormData: FormData | null = null;
    protected _options: any;
    public _initBody(body: any, options: any) {
        this._bodyInit = body;
        if (typeof body === "string") {
            this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body || null;
            this._options = options;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body || null;
        } else if (!body) {
            this._bodyText = ''
        } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        } else {
            throw new Error('unsupported BodyInit type')
        }
    }
    public blob() {

        return new Promise((resolve, reject) => {
            let rejected = Body.consumed(this);
            if (rejected) {
                reject(rejected);
            }
            if (this._bodyBlob) {
                return resolve(this._bodyBlob);
            } else if (this._bodyFormData) {
                return reject(new Error('could not read FormData body as blob'));
            } else {
                return resolve(new Blob([this._bodyText]))
            }
        });
    }
    public arrayBuffer() {
        return this.blob().then(readBlobAsArrayBuffer);
    }
    public formData() {
        this.formData = function () {
            return this.text().then(decode)
        }
    }
    public json() {
        return this.text().then(JSON.parse);
    }
    public text(): Promise<string> {
        return new Promise((resolve, reject) => {
            let rejected = Body.consumed(this);
            if (rejected) {
                reject(rejected);
            }
            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob, this._options);
            } else if (this._bodyFormData) {
                return reject(new Error('could not read FormData body as text'));
            } else {
                return resolve(this._bodyText);
            }
        });
    }
    public static consumed(body: Body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true
    }
}
