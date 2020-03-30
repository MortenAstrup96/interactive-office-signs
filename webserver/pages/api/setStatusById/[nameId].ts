import {setStatusById} from "../../../db/database";

export default (req, res) => {
    setStatusById(req.body);
    res.json("OK");
};
