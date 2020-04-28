import {addUser, getUserById, setUserById} from "../../../db/database";

export default (req: any, res: any) => {
    console.log(req.method);
    switch (req.method) {
        case "POST":
            console.log(req.body);
            addUser(req.body);
            res.json(200);
            break;
        case "PUT":
            setUserById(req.body);
            res.json(200);
            break;
        case "GET":
            const {query: {nameId}} = req;
            res.json(getUserById(nameId));
            break;
    }
};