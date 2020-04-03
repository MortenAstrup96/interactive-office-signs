import {createWriteStream} from "fs";

export default async (req, res) => {
    // for the pipe to work, we need to disable "bodyParser" (see below)
    const {
        query: {nameId},
    } = req;

    req.pipe(createWriteStream("C:/ubiquous-office-signs/webserver/img/profile/" + nameId + ".jpg"));
    res.statusCode = 200;
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};
