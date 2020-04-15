import fetch from "isomorphic-unfetch";

export function fetcher(url: any) {
    return fetch(url).then(r => r.json());
}

export function setPropValue(prop: any, field: string, change: string) {

}

export function getPropString(prop: any, field: string) {
    if (prop && prop.field) {
        return prop.field;
    } else {
        return ""
    }
}
