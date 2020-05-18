main();

function main() {
    let fs = require('fs');

    fs.readdir("logs/", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            readAndParseFile(file);
        });
    });
}

// Reads the file
function readAndParseFile(fileString) {
    let fs = require('fs');
    // https://stackoverflow.com/questions/18386361/read-a-file-in-node-js
    fs.readFile("logs/" + fileString, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            processFileContents(data, fileString);
        } else {
            console.log(err);
        }
    });
}

// Process the file
function processFileContents(data, filename) {
    let parsedData = JSON.parse(data);
    const initialTimestamp = parsedData[0].timestamp;
    let vegaData = parsedData.map(function (value) {
        return {timestamp: convertTimestamp(initialTimestamp, value.timestamp), event: value.event.eventType};
    });
    const vegaFormat = {values: vegaData};
    writeResults(vegaFormat, filename);
}

// Write new file
function writeResults(data, filename) {
    let fs = require('fs');
    const output = "./output";

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    }
    console.log(data);

    fs.writeFileSync("output/" + filename, JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
    });
}


// Helper
function convertTimestamp(initial, current) {
    return Math.round((current - initial) / 1000);
}