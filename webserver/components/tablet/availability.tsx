import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button, Card, CardContent, colors} from "@material-ui/core";
import {serverName} from "../../library/constants";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import {VegaLite} from "react-vega/lib";
import {makeStyles} from "@material-ui/core/styles";



export const Availability: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<string>(props.status);
    const [buttonColor, setButtonColor] = useState<any>({background: colors.green["500"], text: colors.common.black});
    const [nameId] = useState<string>(props.nameId);
    const [inMeeting, setInMeeting] = useState(false);

    //VEGA-------------------
    const vegaStyles = makeStyles({
        root: {margin: 5, maxWidth: 600, maxHeight: 600},
        media: {maxWidth: "100%", maxHeight: "100%"}
    });
    const vegaClasses = vegaStyles();

    let startTime = 0;
    let endTime = 0;
    let currentTime = 0;
    let desc = "";
    let event = [{start: startTime, end: endTime, description: desc}];

    //VEGA-------------------
    let {data} = useSWR(() => serverName + '/api/getCalendar', fetcher, {
        refreshInterval: 10000
    });

    function fetchData() {
        event = [{start: 0, end: 0, description: ""}];
        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);

            // Array of events happening at the moment
            const currentEvents = parseCalendarData(parsed.events);
            console.log("fetchWin");

        } else {
            console.log("fetchFailed");
        }
    };

    // Will parse ICS data when it is received from API.
    useEffect(() => {
        event = [{start: 0, end: 0, description: ""}];

        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);

            // Array of events happening at the moment
            const currentEvents = parseCalendarData(parsed.events);
            if (currentEvents.length >= 1) {
                setInMeeting(true);
            } else {
                setInMeeting(false);
            }
        }
    }, [data]);

    useEffect(() => {
        if (inMeeting) {
            setStatus("Busy");
        } else {
            // Reverts to previous status when meeting is over.
            setStatus(props.status);
        }
    }, [inMeeting]);


    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);


    // Whenever status switches, color of button will change TODO: Change so it just returns a colored button instead
    useEffect(() => {
        if (inMeeting) {
            setButtonColor({background: colors.red.A700, text: colors.common.white});

        }
        switch (status) {
            case "Available":
                setButtonColor({background: colors.green["500"], text: colors.common.white});
                break;
            case "Be right back":
                setButtonColor({background: colors.yellow.A700, text: colors.common.white});
                break;
            case "Busy":
                setButtonColor({background: colors.red.A700, text: colors.common.white});
                break;
            default:
                setButtonColor({background: colors.common.white, text: colors.common.black});
        }
    }, [status]);


    function setCalendar(start: any, end: any, current: any, desc: any) {
        let startDate = new Date(start);
        let endDate = new Date(end);
        let currentDate = new Date(current);

        console.log("SDay "+startDate.toDateString());


        if(startDate.toDateString() === currentDate.toDateString()) {
            currentTime = currentDate.getHours()-2;
            console.log("CT:" +currentTime)
            startTime = startDate.getHours()-2; //TODO: fix with timezone
            endTime = endDate.getHours()-2; //TODO: fix with timezone

            event.push({start: startTime, end: endTime, description: desc});

        }

    }

    // Filters the array of events received
    function parseCalendarData(calendar: any) {
        return calendar.filter((event: any) => {

            try {
                let current = event.dtstamp.getTime();
                let start = event.dtstart.value.getTime();
                let end = event.dtend.value.getTime();
                let desc = event.summary.value.toString();

                console.log("status: "+ desc);

                setCalendar(start, end, current, desc);

                return (current >= start && current <= end)
            } catch (e) {
                console.log(e);
                return
            }
        });
    }


    // Updates database via API on status change
    function putStatusUpdate(status: string) {
        fetch(serverName + '/api/setStatusById/' + props.nameId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId}, {status}))
        });
    }

    // Leave me alone!!
    async function fetcher(url: any) {
        return await fetch(url).then(r => r.text());
    }

    // Will switch between available/busy - If neither switch to available
    function changeStatus() {
        if (status === "Available") {
            setStatus("Busy")
            putStatusUpdate("Busy");
        } else {
            setStatus("Available");
            putStatusUpdate("Available");
        }

    }

    function getVegaView() {
        fetchData();
        //console.log("events: "+events.length);
       // console.log("events: " + events[0]+" 2: "+events[1]);
        console.log("CT2:" +currentTime)

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
                            "y": {"field": "start", "type": "quantitative", "scale": {"domain": [22, 7], "padding": 0},"axis": {"title": ""}},
                            "x": {"field":"", "type": "ordinal","axis": {"title": ""}},
                            "y2": {"field": "end"},
                            "size": {"value": 340}

                        },
                            "layer": [{
                            "mark": "bar"
                        }, {
                            "mark": {
                            "type": "text",
                            "align": "center",
                            "baseline": "top",
                            "dy": 10
                        },
                            "encoding": {
                            "text": {"field": "description", "type": "ordinal"},
                            "size": {"value": 14}
                        }

                        }]

                        }}/>
                    </CardContent>
                </Card>
            </div>
        );

    }
    return (
        <div>
            <Button variant="contained" onClick={changeStatus}
                    style={{backgroundColor: buttonColor.background, color: buttonColor.text, width: 200, height: 50}}>
                {status}
            </Button>
            <div>
                {getVegaView()}
            </div>
        </div>

    );
};

//[
//                                     {"start": startTime, "end": endTime}
//                                 ]