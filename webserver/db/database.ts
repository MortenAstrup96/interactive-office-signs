import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'
import {OfficeAvailabilityProps, OfficeInformationProps} from "../library/general_interfaces";

// https://www.npmjs.com/package/node-json-db
var db = new JsonDB(new Config("db/officeDB", true, false, '/'));

export function getAll() {
    return db.getData("/");
}

export function getPersonData() {
    return db.getData("/personList");
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

export function addPerson(personToAdd: OfficeInformationProps) {
    if(personToAdd) {
        console.log(personToAdd);
        db.push("/person/" + personToAdd.nameId + "/nameId", personToAdd.nameId);
        db.push("/person/" + personToAdd.nameId + "/name", personToAdd.name);
        db.push("/person/" + personToAdd.nameId + "/office", personToAdd.officeId);
        db.push("/person/" + personToAdd.nameId + "/mail", personToAdd.mail);
        db.push("/person/" + personToAdd.nameId + "/status", personToAdd.status);
        db.push("/personList[]/", {name: personToAdd.name, nameId: personToAdd.nameId});
    }
}

export function generateGenericDatabase() {
    db.push("/person/7913/nameId", "7913");
    db.push("/person/7913/name", "Jo Vermeulen");
    db.push("/person/7913/office", "Ada-589");
    db.push("/person/7913/mail", "Jo@gmail.com");
    db.push("/person/7913/status", "busy");
    db.push("/personList[]", {name: "Jo Vermeulen", nameId: "7913"});


    db.push("/person/5922/nameId", "5922");
    db.push("/person/5922/name", "Martin Kjær");
    db.push("/person/5922/office", "Stibitz-2");
    db.push("/person/5922/mail", "m.Kjaer@facebook.com");
    db.push("/person/5922/status", "available");
    db.push("/personList[]", {name: "Martin Kjær", nameId: "5922"});

    db.push("/person/3559/nameId", "3559");
    db.push("/person/3559/name", "Niels Oluf Bouvin");
    db.push("/person/3559/office", "Ada-246");
    db.push("/person/3559/mail", "Boivin@cs.au.dk");
    db.push("/person/3559/status", "available");
    db.push("/personList[]", {name: "Niels Oluf Bouvin", nameId: "3559"});
}