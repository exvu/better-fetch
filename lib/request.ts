
import Headers from './header';
export default class Request {

    public readonly name: string;
    public constructor(input: Request | string, init?: any) {
        this.name = "1";
    }

    public clone(target: Request) {
        return new Request(this);
    }
}