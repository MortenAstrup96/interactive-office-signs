import {getUserById} from "../../../db/database";

export default (req, res) => {
    const {query: {nameId}} = req;
    res.json(getUserById(nameId));
};
