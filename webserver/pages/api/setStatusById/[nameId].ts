import {setPersonById} from "../../../db/database";

export default (req, res) => {
    setPersonById(req.body);
    res.json("OK");
};
