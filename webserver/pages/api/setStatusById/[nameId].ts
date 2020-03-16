import {getOfficeInformation, setPersonById} from "../../../db/database";

export default (req, res) => {
    console.log("STATUS")
    const {query: {nameId}} = req
    setPersonById(nameId)
    res.json("OK");
};
