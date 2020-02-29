import {getAll} from "../../db/database";

export default (req, res) => {
    switch (req.method) {
      case 'GET': 
        const quote = getAll();
        res.status(200).json(quote);
        break
      case 'POST':
        //...
        break
      default:
        res.status(405).end() //Method Not Allowed
        break
    }
  };
