import {getUserById} from "../../../db/database";

export default (req: any, res: any) => {
    const {query: {nameId}} = req;
    res.json(getUserById(nameId));
};