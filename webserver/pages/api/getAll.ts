import {getAll} from "../../db/database";

export default (req, res) => {
    const quote = getAll();
    res.status(200).json(quote);
};
