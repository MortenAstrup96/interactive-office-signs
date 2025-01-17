import {createWriteStream} from "fs";
import path from "path";

export default async (req: any, res: any) => {
    // for the pipe to work, we need to disable "bodyParser" (see below)
    const {
        query: {nameId},
    } = req;

    req.pipe(createWriteStream("./static/" + nameId + ".jpg"));
    console.log("Creating image ...");
    res.statusCode = 200;
    res.end();
};


export const config = {
    api: {
        bodyParser: false,
    },
};
