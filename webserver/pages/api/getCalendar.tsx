export default async (req: any, res: any) => {
    const https = require('https');

    await https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/b6b30eda-806b-4319-a6cc-5e8e6b8d6c05/cid-65B17BCEE8638647/calendar.ics", function (response: any) {
        res.status(200).send(response)
    });
};