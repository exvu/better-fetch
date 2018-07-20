import { normalizeValue, normalizeName } from './common';
export default class Headers {

    private map: { [index: string]: any } = {};

    public constructor(headers: any) {
        if (headers instanceof Headers) {
            let list = headers.entries()
            list.forEach(([name, value]) => {
                this.append(name, value);
            })
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach((name) => {
                this.append(name, headers[name]);
            })
        }
    }
    public append(name: string, value: string): any {
        name = normalizeName(name);
        value = normalizeValue(value);
        let list = this.map[name];
        if (!list) {
            list = [];
            this.map[name] = list;
        }
        list.push(value);
    }
    public delete(name: string) {
        delete this.map[normalizeName(name)];
    }
    public entries() {
        let list = [];
        for (let name in this.map) {
            list.push([name, this.map[name].join(';')])
        }
        return list;
    }
    public get(name: string) {
        let values = this.map[normalizeName(name)];
        return values ? values[0] : null;
    }
    public has(name: string) {
        return this.map.hasOwnProperty(normalizeName(name));
    }
    public set(name: string, value: string) {
        this.map[normalizeName(name)] = [normalizeValue(value)];
    }
    public keys() {
        return Object.keys(this.map);
    }
    public values() {
        return Object.values(this.map);
    }
}