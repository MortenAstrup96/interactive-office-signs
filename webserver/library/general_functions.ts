import fetch from "isomorphic-unfetch";

export function fetcher(url: any) {
    return fetch(url).then(r => r.json());
}

export function setPropValue(prop: any, field: string, change: string) {
    let propCopy = JSON.parse(JSON.stringify(prop));
    propCopy.field = change;
    return propCopy;
}

export function getPropString(prop: any, field: string) {
    if (prop && prop.field) {
        return prop.field;
    } else {
        return ""
    }
}
