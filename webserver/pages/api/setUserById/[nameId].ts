import {setUserById} from "../../../db/database";

export default (req, res) => {
    setUserById(req.body);
    res.json("OK");
};
