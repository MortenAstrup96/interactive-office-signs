import React, {useEffect, useState} from "react";
import {Card, CardContent, CardMedia, IconButton} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {DataType} from "../../library/enums";
import {VegaLite} from "react-vega/lib";
import {serverName} from "../../library/constants";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import IconPerson from "../../img/icons/iconPerson";
import IconDelete from "../../img/icons/iconDelete";


interface ImageInformation {
    src: string;
    dataType: string;
    cardStyles: any;
    consoleView?: boolean;

    removeCurrent(): void;
}

const imageStyles = makeStyles({
    root: {margin: 10},
    media: {minWidth: "100%", minHeight: "100%"}
});


export const ImageCard = (props: ImageInformation) => {
    const cardClasses = props.cardStyles();
    const imgClasses = imageStyles();

    //Calendar-------------------
    const vegaStyles = makeStyles({
        root: {margin: 5, maxWidth: 600, maxHeight: 600},
        media: {width: "100%", height: "100%"}
    });
    const vegaClasses = vegaStyles();
    type dataType = { start: number, end: number, description: string, time: number }
    const [calendarEvents, setCalendarEvents] = useState<dataType[]>([]);
    const [currentTime, setCurrentTime] = useState(0.0);

    let {data} = useSWR(() => '/api/getCalendar', fetcher, {
        refreshInterval: 10000
    });

    // Leave me alone!!
    function fetcher(url: any) {
        if (props.dataType === DataType.CALENDAR) {
            const calendar = props.src;
            return fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({calendar})
            }).then(r => r.text());
        }
    }


    useEffect(() => {
        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);
            // Array of events happening at the moment
            parseCalendarData(parsed.events);
        }
    }, [data]);

    function getCustomView() {
        if (props.dataType === DataType.VEGA) {
            return getVegaView();
        } else if (props.dataType === DataType.IMAGE) {
            return (
                <div>
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent
                            style={{position: "relative", display: "inline-block", width: "100%", height: "100%"}}>

                            {getDeleteButton()}
                            <div style={{
                                height: "100%",
                                width: "100%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={props.src} className={imgClasses.media}/>
                            </div>
                        </CardContent>
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
            if (props.src.length < 40) {
                return (
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent
                            style={{position: "relative", display: "inline-block", width: "100%", height: "100%"}}>

                            {getDeleteButton()}
                            <div style={{
                                height: "100%",
                                width: "100%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <h1>{props.src}</h1>
                            </div>
                        </CardContent>
                    </Card>
                );
            } else if (props.src.length < 100) {
                return (
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent
                            style={{position: "relative", display: "inline-block", width: "100%", height: "100%"}}>

                            {getDeleteButton()}
                            <div style={{
                                height: "100%",
                                width: "100%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <h2>{props.src}</h2>
                            </div>

                        </CardContent>
                    </Card>
                );
            }
            return (
                <Card variant="outlined" className={cardClasses.root}>
                    <CardContent
                        style={{position: "relative", display: "inline-block", width: "100%", height: "100%"}}>

                        {getDeleteButton()}
                        <div style={{
                            height: "100%",
                            width: "100%",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <p>{props.src}</p>
                        </div>
                    </CardContent>
                </Card>);
        }
        return (
            <Card variant="outlined" className={cardClasses.root}>

            </Card>);
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(props.src);
            return (
                <div>
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardContent className={vegaClasses.media}
                                     style={{
                                         position: "relative",
                                         display: "inline-block",
                                         width: "100%",
                                         height: "100%"
                                     }}>
                            {getDeleteButton()}
                            <div style={{
                                height: "100%",
                                width: "100%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <VegaLite spec={parsedVega}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        } catch (e) {
        }
    }

    function getDeleteButton() {
        return (
            <IconButton onClick={(e: any) => removeImageButton(e)} style={{
                position: "absolute",
                top: "11%",
                left: "94%",
                transform: "translate(-50%, -50%)",
                color: "#2142fw",
                padding: 0
            }}>
                <IconDelete/>
            </IconButton>)
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

    function convertTimeToDecimal(time: any) {
        return time.getHours() + (time.getMinutes() / 60);
    }

    function setCalendar(start: any, end: any, current: any, desc: any) {
        let startDate = new Date(start);
        let endDate = new Date(end);
        let currentDate = new Date(current);

        // If the event is from the current day
        if (startDate.toDateString() === currentDate.toDateString()) {
            setCurrentTime(convertTimeToDecimal(currentDate));
            let startTime = convertTimeToDecimal(startDate) - 2; //TODO: fix with timezone
            let endTime = convertTimeToDecimal(endDate) - 2; //TODO: fix with timezone

            // If the event is not in the past: add to array
            if (endTime > convertTimeToDecimal(currentDate)) {
                let eventsCopy = calendarEvents;
                eventsCopy.length = 0; //empty array to avoid duplication of events
                eventsCopy.push({
                    start: startTime,
                    end: endTime,
                    description: desc,
                    time: convertTimeToDecimal(currentDate)
                });

                setCalendarEvents(eventsCopy);
            }
        }
    }

    function removeImageButton(e: any) {
        e.stopPropagation();
        props.removeCurrent();
    }

    function getCalendarView() {
        return (
            <div style={{padding: "0"}}>
                <Card variant="outlined" className={cardClasses.root}>
                    <CardContent style={{padding: "0"}}>
                        <VegaLite spec={{
                            "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
                            "description": "A simple bar chart with ranged data (aka Gantt Chart).",
                            "width": 273,
                            "height": 320,
                            "data": {
                                "values": JSON.stringify(calendarEvents)
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
                                "size": {"value": 273}

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