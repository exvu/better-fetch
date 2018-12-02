import helper from '../helper'
import Request from './Request'
import Response from './Response'
import { RequestOption, AdapterOption } from './doRequest';
const DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/json'
}


function getAllowAUseddapter() {
    const allowList: { [index: string]: Promise<Response> } = {};
    if (typeof fetch !== 'undefined' && helper.isFunction(fetch)) {
        allowList['fetch'] = require('../adapter/browser/fetch').default;
    } else if (typeof XMLHttpRequest !== 'undefined') {
        allowList['xhr'] = require('../adapter/browser/xhr').default;
    }
    return allowList;
}
function getAdapter(configs: AdapterOption): Promise<Response> {
    const allowList = getAllowAUseddapter();
    const type = configs.adapter;
    if (type) {
        if (!(type in allowList)) {
            throw new Error(`env not supper ${type}`);
        }
        return allowList[type];
    }
    let adapter;
    if ('fetch' in allowList && !(configs.onDownloadProgress || configs.onUploadProgress)) {
        adapter = allowList['fetch'];
    } else if ('xhr' in allowList) {
        adapter = allowList['xhr'];
    } else {
        throw new Error('env not supper request');
    }
    return adapter;
}

export default {
    getAdapter,
}