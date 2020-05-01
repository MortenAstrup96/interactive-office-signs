import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button, colors} from "@material-ui/core";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import {getAvailableButton, getBusyButton} from "../../library/general_functions";


export const Availability: React.FC<OfficeAvailabilityProps> = props => {


    const [status, setStatus] = useState<any>(props.status);
    const [nameId] = useState<string>(props.nameId);

    let {data} = useSWR(() => '/api/getCalendar', fetcher, {
        refreshInterval: 120000
    });

    // Will parse ICS data when it is received from API.
    useEffect(() => {
        if (data) {
            const ical = require('cal-parser');
            const parsed = ical.parseString(data);

            // Array of events happening at the moment
            const currentEvents = parseCalendarData(parsed.events);
            if (currentEvents.length >= 1) {
                setStatus({text: "In Meeting", color: colors.red.A700})
            } else {
                setStatus(props.status);
            }
        }
    }, [data]);


    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);


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
    function putStatusUpdate(status: any) {
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
        if (status.text === "Available") {
            setStatus(getBusyButton())
            putStatusUpdate(getBusyButton());
        } else {
            setStatus(getAvailableButton());
            putStatusUpdate(getAvailableButton());
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={changeStatus}
                    style={{backgroundColor: status.color, color: "#ffffff", width: 200, height: 50, fontSize: "20px"}}>
                {status.text}
            </Button>
        </div>
    );
};