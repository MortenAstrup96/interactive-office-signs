import {addUser, getUserById, setUserById} from "../../../db/database";

export default (req: any, res: any) => {
    switch (req.method) {
        case "POST":
            addUser(req.body);
            res.json(200);
            break;
        case "PUT":
            setUserById(req.body);
            res.json(200);
            break;
        case "GET":
            const {query: {nameId}} = req;
            console.log(nameId);
            res.json(getUserById(nameId));
            break;
    }
};