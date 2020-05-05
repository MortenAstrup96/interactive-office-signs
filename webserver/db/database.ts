import {JsonDB} from 'node-json-db';
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'
import {UserInformation} from "../library/general_interfaces";
import {DataType, ViewType} from "../library/enums";

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
        db.push("/person/" + changeRequest.nameId, changeRequest);
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
        db.push("/person/" + personToAdd.nameId + "/office", personToAdd.office);
        db.push("/person/" + personToAdd.nameId + "/title", personToAdd.title);
        db.push("/person/" + personToAdd.nameId + "/mail", personToAdd.mail);
        db.push("/person/" + personToAdd.nameId + "/status", "Available");
        db.push("/person/" + personToAdd.nameId + "/calendarURL", personToAdd.calendarURL);
        db.push("/person/" + personToAdd.nameId + "/viewType", ViewType.SINGLE);
        db.push("/person/" + personToAdd.nameId + "/firstView/dataType", DataType.EMPTY);
        db.push("/person/" + personToAdd.nameId + "/firstView/data", "");
        db.push("/person/" + personToAdd.nameId + "/secondView/dataType", DataType.EMPTY);
        db.push("/person/" + personToAdd.nameId + "/secondView/data", "");
        db.push("/person/" + personToAdd.nameId + "/thirdView/dataType", DataType.EMPTY);
        db.push("/person/" + personToAdd.nameId + "/thirdView/data", "");
        db.push("/person/" + personToAdd.nameId + "/fourthView/dataType", DataType.EMPTY);
        db.push("/person/" + personToAdd.nameId + "/fourthView/data", "");
        db.push("/person/" + personToAdd.nameId + "/customView/dataType", DataType.EMPTY);
        db.push("/person/" + personToAdd.nameId + "/customView/data", "");
        db.push("/personList[]/", {name: personToAdd.name, nameId: personToAdd.nameId});
    }
}
