import {setUserById} from "../../../db/database";

export default (req: any, res: any) => {
    setUserById(req.body);
    res.json("OK");
};
