import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'
import {OfficeAvailabilityProps} from "../library/general_interfaces";

// https://www.npmjs.com/package/node-json-db
var db = new JsonDB(new Config("db/officeDB", true, false, '/'));

export function getAll() {
    return db.getData("/");
}

export function getOfficeInformation(id: any) {
    if (id) {
        return db.getData("/person/" + id);
    }
}

export function setPersonById(statusRequest: OfficeAvailabilityProps) {
    if(statusRequest) {
        db.push("/person/" + statusRequest.nameId + "/status", statusRequest.status)
    }
}

export function generateGenericDatabase() {
    db.push("/office/Ada-247/nameId", "7913");
    db.push("/person/7913/nameId", "7913");
    db.push("/person/7913/name", "Jo Vermeulen");
    db.push("/person/7913/mail", "Jo@gmail.com");
    db.push("/person/7913/status", "busy");

    db.push("/office/Hopper-129/nameId", "5922");
    db.push("/person/5922/nameId", "5922");
    db.push("/person/5922/name", "Martin Kjær");
    db.push("/person/5922/mail", "m.Kjaer@facebook.com");
    db.push("/person/5922/status", "available");

    db.push("/office/Ada-299/nameId", "3559");
    db.push("/person/3559/nameId", "3559");
    db.push("/person/3559/name", "Niels Oluf Bouvin");
    db.push("/person/3559/mail", "Boivin@cs.au.dk");
    db.push("/person/3559/status", "available");
}