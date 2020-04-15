import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'
import {UserInformation} from "../library/general_interfaces";

// https://www.npmjs.com/package/node-json-db
var db = new JsonDB(new Config("db/officeDB", true, false, '/'));

export function getAll() {
    return db.getData("/");
}

export function getUserList() {
    return db.getData("/personList");
}

export function getUserById(id: any) {
    if (id) {
        return db.getData("/person/" + id);
    }
}

export function setUserById(changeRequest: UserInformation) {
    if (changeRequest) {
        db.push("/person/" + changeRequest.nameId + "/status", changeRequest.status);
        db.push("/person/" + changeRequest.nameId + "/topView", changeRequest.topView);
    }
}

export function setStatusById(changeRequest: UserInformation) {
    if (changeRequest) {
        db.push("/person/" + changeRequest.nameId + "/status", changeRequest.status);
    }
}

// TODO: Is it possible to add an a person as object instead of wasting multiple lines on this?
export function addUser(personToAdd: UserInformation) {
    if (personToAdd) {
        db.push("/person/" + personToAdd.nameId + "/nameId", personToAdd.nameId);
        db.push("/person/" + personToAdd.nameId + "/name", personToAdd.name);
        db.push("/person/" + personToAdd.nameId + "/office", personToAdd.officeId);
        db.push("/person/" + personToAdd.nameId + "/mail", personToAdd.mail);
        db.push("/person/" + personToAdd.nameId + "/status", personToAdd.status);
        db.push("/personList[]/", {name: personToAdd.name, nameId: personToAdd.nameId});
    }
}
