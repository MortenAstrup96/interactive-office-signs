export default async (req: any, res: any) => {
    const https = require('https');

    const url = req.body.calendar;
    if (url.includes("https://outlook.live.com/") && url.includes(".ics", (url.length - 4))) {
        await https.get(url, function (response: any) {
            try {
                res.status(200).send(response)
            } catch (e) {
                console.log(e);
            }
        });
    } else {
        res.status(400);
    }
}