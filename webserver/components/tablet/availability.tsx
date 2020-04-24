import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button, colors} from "@material-ui/core";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import {useRouter} from "next/router";


export const Availability: React.FC<OfficeAvailabilityProps> = props => {


    const [status, setStatus] = useState<string>(props.status);
    const [buttonColor, setButtonColor] = useState<any>({background: colors.green["500"], text: colors.common.black});
    const [nameId] = useState<string>(props.nameId);
    const [inMeeting, setInMeeting] = useState(false);

    let {data} = useSWR(() => '/api/getCalendar', fetcher, {
        refreshInterval: 10000
    });

    // Will parse ICS data when it is received from API.
    useEffect(() => {
        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);
            console.log(parsed);

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


    // Filters the array of events received
    function parseCalendarData(calendar: any) {
        return calendar.filter((event: any) => {

            try {
                let current = event.dtstamp.getTime();
                let start = event.dtstart.value.getTime();
                let end = event.dtend.value.getTime();

                return (current >= start && current <= end)
            } catch (e) {
                console.log(e);
                return
            }
        });
    }


    // Updates database via API on status change
    function putStatusUpdate(status: string) {
        fetch('/api/setStatusById/' + props.nameId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId}, {status}))
        });
    }

    // Leave me alone!!

    function fetcher(url: any) {
        const calendar = props.calendarURL;
        return fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({calendar})
        }).then(r => r.text());
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

    return (
        <div>
            <Button variant="contained" onClick={changeStatus}
                    style={{backgroundColor: buttonColor.background, color: buttonColor.text, width: 200, height: 50}}>
                {status}
            </Button>
        </div>
    );
};