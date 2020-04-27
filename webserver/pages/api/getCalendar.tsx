export default async (req: any, res: any) => {
    const https = require('https');

    await https.get("https://outlook.live.com/owa/calendar/8b7e4858-fb96-494a-9f6a-92f2f78424d5/3daa9f87-4eff-4d64-98a5-f65ff1ee9bf0/cid-C17783A928EABA93/calendar.ics", function (response: any) {
            res.status(200).send(response)
        });
    };