import {addUser} from "../../db/database";

export default (req, res) => {
    addUser(req.body);
    res.json(200);
};
