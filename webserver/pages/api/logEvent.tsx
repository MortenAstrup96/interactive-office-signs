export default (req: any, res: any) => {
    let fs = require('fs');


    let log: any;
    fs.readFile("./logs/" + req.body.user + ".json", function (err: any, data: any) {
        if (err) {
            console.log("Failed - Writing to empty file");
            log = [];
            log.push(req.body);
            writeToFile(log);
            return console.log(err);
        }

        try {
            log = JSON.parse(data);
            log.push(req.body);
            writeToFile(log);
        } catch (e) {
            console.log(e);
        }


    });

    function writeToFile(log: any[]) {
        fs.writeFile("./logs/" + req.body.user + ".json", JSON.stringify(log), function (err: any) {
            if (err) return console.log(err);
            console.log("Wrote to file");
        });

        res.json(200);
    }


};