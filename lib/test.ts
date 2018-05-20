import {parseParams,paramstoQuery} from './fetch';


console.log(paramstoQuery(parseParams({
    a:1,
    b:{
        a:{
            c:[1,2,3],
            d:1
        },
        b:2
    }
})))