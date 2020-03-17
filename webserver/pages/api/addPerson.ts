import {addPerson} from "../../db/database";

export default (req, res) => {
            addPerson(req.body);
            res.status(200);
};
