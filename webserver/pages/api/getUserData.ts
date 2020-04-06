import {getUserList} from "../../db/database";

export default (req: any, res: any) => {
    const quote = getUserList();
    res.json(quote);
};
