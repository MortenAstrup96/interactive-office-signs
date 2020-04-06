import {setStatusById} from "../../../db/database";

export default (req: any, res: any) => {
    setStatusById(req.body);
    res.json("OK");
};
