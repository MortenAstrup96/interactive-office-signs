import fetch from "isomorphic-unfetch";

export function fetcher(url) {
    return fetch(url).then(r => r.json());
}