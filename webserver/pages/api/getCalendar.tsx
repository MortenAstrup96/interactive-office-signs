export default async (req: any, res: any) => {
    const fs = require('fs');
    await fs.readFile("./db/calendars/mogens.txt", 'utf-8', (err: any, data: any) => {
        res.status(200).send(data)
    });
};


