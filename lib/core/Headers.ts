import helper from '../helper';


export default class Headers {
    private map: { [index: string]: Array<string> } = {};

    /**
     * @param init 可选
     * 通过一个包含任意 HTTP headers 的对象来预设你的 Headers. 可以是一个ByteString 对象; 或者是一个已存在的 Headers 对象. 
     */
    public constructor(init?: Headers | { [index: string]: string }) {
        if (init instanceof Headers) {
            let list = init.entries()
            list.forEach(([key, value]) => {
                this.map[key] = value.split(';');
            })
        } else if (init && helper.isObject(init)) {
            Object.getOwnPropertyNames(init).forEach((key) => {
                this.append(key, init[key]);

            })
        } else {
            throw new TypeError(
                "Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)'"
            )
        }
    }

    public append(key: string, value: string): any {
        key = helper.normalizeHeadersKey(key);
        value = helper.normalizeHeadersValue(value);
        if (!(key in this.map)) {
            this.map[key] = [];
        }
        this.map[key].push(value);
    }


    public delete(key: string) {
        delete this.map[helper.normalizeHeadersKey(key)];
    }

    public entries(): Array<Array<string>> {
        let list = [];
        for (let key in this.map) {
            list.push([key, this.map[key].join(';')])
        }
        return list;
    }
    public get(key: string) {
        let values = this.map[helper.normalizeHeadersKey(key)];
        return values ? values[0] : null;
    }
    public has(key: string) {
        return this.map.hasOwnProperty(helper.normalizeHeadersKey(key));
    }
    public set(key: string, value: string) {
        this.map[helper.normalizeHeadersKey(key)] = [helper.normalizeHeadersValue(value)];
    }
    public keys() {
        return Object.keys(this.map);
    }
    public values() {
        let list = [];
        for (let key in this.map) {
            list.push(this.map[key].join(';'))
        }
        return list;
    }
}