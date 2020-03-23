import {getUserList} from "../../db/database";

export default (req, res) => {
    const quote = getUserList();
    res.json(quote);
};
