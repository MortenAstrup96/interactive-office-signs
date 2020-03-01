import {getAll, getPerson} from "../../../db/database";

export default (req, res) => {
    const {query: {nameId}} = req
    res.json(getPerson(nameId))
};
