import React, {useEffect} from "react";
import {Card, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {DataType} from "../../library/enums";
import {VegaLite} from "react-vega/lib";
import {serverName} from "../../library/constants";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";


interface ImageInformation {
    src: string;
    dataType: string;
    cardStyles: any;
    consoleView?: boolean;
}

const imageStyles = makeStyles({
    root: {margin: 10},
    media: {minWidth: "100%", minHeight: "100%"}
});
const vegaStyles = makeStyles({
    root: {margin: 5, maxWidth: 600, maxHeight: 600},
    media: {maxWidth: "100%", maxHeight: "100%"}
});
const calendarStyles = makeStyles({
    root: {margin: 10},
    media: {minWidth: "100%", minHeight: "100%"}
});


export const ImageCard = (props: ImageInformation) => {
    const cardClasses = props.cardStyles();
    const imgClasses = imageStyles();

    //Calendar-------------------
    let currentTime = 0.0;
    const vegaStyles = makeStyles({
        root: {margin: 5, maxWidth: 600, maxHeight: 600},
        media: {maxWidth: "100%", maxHeight: "100%"}
    });
    const vegaClasses = vegaStyles();
    type dataType = { start: number, end: number, description: string, time: number }
    let event = new Array<dataType>();

    function fetcher(url: any) {
        const calendar = props.src;
        return fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({calendar})
        }).then(r => r.text());
    }

    let {data} = useSWR(() => serverName + '/api/getCalendar', fetcher, {
        refreshInterval: 10000
    });

    function getCustomView() {
        if (props.dataType === DataType.VEGA) {
            return getVegaView();
        } else if (props.dataType === DataType.IMAGE) {
            return (
                <div>
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardMedia
                            component="img"
                            className={imgClasses.media}
                            image={props.src}
                        />
                    </Card>
                </div>
            )
        } else if (props.dataType === DataType.CALENDAR) {
            return (
                <div>
                    {getCalendarView()}
                </div>
            );
        } else if (props.dataType === DataType.TEXT) {
            console.log(props.src.length);
            if (props.src.length < 40) {
                return (
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent>
                            <h1>{props.src}</h1>
                        </CardContent>
                    </Card>
                );
            } else if (props.src.length < 100) {
                return (
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent>
                            <h2>{props.src}</h2>
                        </CardContent>
                    </Card>
                );
            }
            return (
                <Card variant="outlined" className={cardClasses.root}>
                    <CardContent>
                        <p>{props.src}</p>
                    </CardContent>
                </Card>);
        }
        return (
            <div className={cardClasses.root}>

            </div>);
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(props.src);
            return (
                <div>
                    <Card variant="outlined" className={vegaClasses.root}>
                        <CardContent className={vegaClasses.media}>
                            <VegaLite spec={parsedVega}/>
                        </CardContent>
                    </Card>
                </div>
            );
        } catch (e) {
        }
    }

    function parseCalendarData(calendar: any) {
        return calendar.filter((event: any) => {

            try {
                let current = event.dtstamp.getTime();
                let start = event.dtstart.value.getTime();
                let end = event.dtend.value.getTime();
                let desc = event.summary.value.toString();

                setCalendar(start, end, current, desc);

                return (current >= start && current <= end)
            } catch (e) {
                console.log(e);
                return
            }
        });
    }

    function fetchData() {
        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);

            // Array of events happening at the moment
            const currentEvents = parseCalendarData(parsed.events);
            console.log("fetchWin");

        } else {
            console.log("fetchFailed");
        }
    }

    function convertTimeToDecimal(time: any) {
        return time.getHours() + (time.getMinutes() / 60);
    }

    function setCalendar(start: any, end: any, current: any, desc: any) {
        let startDate = new Date(start);
        let endDate = new Date(end);
        let currentDate = new Date(current);

        // If the event is from the current day
        if (startDate.toDateString() === currentDate.toDateString()) {
            currentTime = convertTimeToDecimal(currentDate);
            let startTime = convertTimeToDecimal(startDate) - 2; //TODO: fix with timezone
            let endTime = convertTimeToDecimal(endDate) - 2; //TODO: fix with timezone

            // If the event is not in the past: add to array
            if (endTime > currentTime) {
                event.push({start: startTime, end: endTime, description: desc, time: currentTime});
            }
        }
    }

    function getCalendarView() {
        fetchData();
        return (
            <div>
                <Card variant="outlined" className={vegaClasses.root}>
                    <CardContent className={vegaClasses.media}>
                        <VegaLite spec={{
                            "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
                            "description": "A simple bar chart with ranged data (aka Gantt Chart).",
                            "width": 350,
                            "height": 450,
                            "data": {
                                "values": event
                            },
                            "encoding": {
                                "y": {
                                    "field": "start",
                                    "type": "quantitative",
                                    "scale": {"domain": [22, currentTime - 2], "padding": 0},
                                    "axis": {"title": ""}
                                },
                                "x": {"field": "", "type": "ordinal", "axis": {"title": ""}},
                                "y2": {"field": "end"},
                                "size": {"value": 340}

                            },
                            "layer": [{
                                "mark": "bar",
                                "encoding": {"color": {"value": "#002546"}} //AU color
                            }, {
                                "mark": {
                                    "type": "text",
                                    "align": "center", "clip": true,
                                    "baseline": "top",
                                    "dy": 10
                                },
                                "encoding": {
                                    "text": {"field": "description", "type": "ordinal"},
                                    "size": {"value": 14}, "color": {"value": "white"}
                                }
                            },
                                {
                                    "mark": {"type": "point"},
                                    "encoding": {
                                        "y": {"field": "time", "type": "quantitative"},
                                        "color": {"value": "red"},
                                        "size": {"value": 130000},
                                        "shape": {"value": "stroke"}
                                    }
                                }
                            ]
                        }}/>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div>
            {getCustomView()}
        </div>

    );
};