export default (req: any, res: any) => {
    const https = require('https');

    const url = req.body.calendar;
    return new Promise(resolve => {
        if (url && url.includes("https://outlook.live.com/") && url.includes(".ics", (url.length - 4))) {
            https.get(url, function (response: any) {

                res.send(response);
                return resolve();
            })

        } else {
            return res.status(400);
        }
    });
}