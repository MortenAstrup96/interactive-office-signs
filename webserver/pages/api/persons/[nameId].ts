import {getOfficeInformation} from "../../../db/database";

export default (req, res) => {
    const {query: {nameId}} = req
    res.json(getOfficeInformation(nameId))
};
