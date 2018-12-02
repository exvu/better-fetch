import { AdapterOption } from '../../core/doRequest';
import Response from '../../core/Response';
export default function fetchAdater({
    request,
    ...config
}: AdapterOption) {
    return new Promise((resolve, reject) => {
        try {
            let timeoutId: any;
            if (config.timeout) {
                timeoutId = setTimeout(function () {
                    reject(new Error("fetch timeout"))
                }, config.timeout);
            }
            const body: any = request.body;
            fetch(request.url, {
                method: request.method,
                headers: request.headers.entries(),
                mode: request.mode,
                body,
            }).then((res: any) => {
                clearTimeout(timeoutId);
                if (res.status >= 200 && res.status < 300) {
                    resolve(res);
                }
                const error: any = new Error(res.statusText);
                error.response = res;
                throw error;
            }).catch((err) => {
                clearTimeout(timeoutId);
                reject(err)
            });
        } catch (e) {
            reject(e);
        }
    });
}