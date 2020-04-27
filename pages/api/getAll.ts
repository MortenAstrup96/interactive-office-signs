import {getAll} from "../../db/database";

export default (req: any, res: any) => {
    const quote = getAll();
    res.status(200).json(quote);
};
