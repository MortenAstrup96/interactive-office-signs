export default async (req: any, res: any) => {
    const https = require('https');

    await https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/dbc48390-6425-43ff-a0bf-569b3079336c/cid-65B17BCEE8638647/calendar.ics", function (response: any) {
        res.status(200).send(response)
    });
};