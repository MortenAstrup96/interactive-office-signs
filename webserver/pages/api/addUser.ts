import {addUser} from "../../db/database";

export default (req: any, res: any) => {
    addUser(req.body);
    res.json(200);
};
