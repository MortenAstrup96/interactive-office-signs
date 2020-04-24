export default (req: any, res: any) => {
    const https = require('https');
    const fs = require('fs');

    const file = fs.createWriteStream("./db/calendars/mogens.txt");
    https.get("https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/bf6ccd5b-56b8-4b31-9ea5-be0a03c36e8d/cid-65B17BCEE8638647/calendar.ics", function (response: any) {
        response.pipe(file);
    });

    res.end();
};

