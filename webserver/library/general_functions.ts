import fetch from "isomorphic-unfetch";
import {colors} from "@material-ui/core";

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

export function getAvailableButton() {
    return {text: "Available", color: colors.green["500"]}
}

export function getAwayButton() {
    return {text: "Away", color: colors.yellow.A700}
}

export function getBusyButton() {
    return {text: "Busy", color: colors.red.A700}
}