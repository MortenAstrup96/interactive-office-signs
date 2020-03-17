import {getPersonData} from "../../db/database";

export default (req, res) => {
            const quote = getPersonData();
            res.status(200).json(quote);
};
