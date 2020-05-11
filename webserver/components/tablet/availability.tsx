import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button, Card, CardContent, colors, Modal, ThemeProvider} from "@material-ui/core";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import {generateLogEvent, getAvailableButton, getAwayButton, getBusyButton} from "../../library/general_functions";
import OfficeInformationId from "../../pages/office/details/[personId]";
import {CustomButton} from "../userConsole/CustomButton";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "../../img/icons/iconDelete";
import {buttonStyle} from "../../styles/userConsoleStyles";
import {Status} from "../userConsole/status";


export const Availability: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<any>(props.status);
    const [showModal, setShowModal] = useState(false);
    const [nameId] = useState<string>(props.nameId);
    const buttonStyling = buttonStyle();

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
                let current;
                let start = event.dtstart.value.getTime();
                let end = event.dtend.value.getTime();

                // Start and end might come in as
                if (event.dtstart.params.tzid === "Romance Standard Time") {
                    current = event.dtstamp.getTime() + 7200000;
                } else {
                    current = event.dtstamp.getTime();
                }

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
    function changeStatus(buttonInfo: any) {
        if (buttonInfo.text === "Available") {
            generateLogEvent(props.nameId, {eventType: "Status Change", status: "Available"});
            setStatus(getAvailableButton())
            putStatusUpdate(getAvailableButton());
        } else if (buttonInfo.text === "Busy") {
            generateLogEvent(props.nameId, {eventType: "Status Change", status: "Busy"});
            setStatus(getBusyButton);
            putStatusUpdate(getBusyButton());
        } else if (buttonInfo.text === "Away") {
            generateLogEvent(props.nameId, {eventType: "Status Change", status: "Available"});
            setStatus(getAwayButton());
            putStatusUpdate(getAwayButton());
        } else {
            generateLogEvent(props.nameId, {eventType: "Status Change", status: buttonInfo.text});
            setStatus({text: buttonInfo.text, color: buttonInfo.color});
            putStatusUpdate({text: buttonInfo.text, color: buttonInfo.color});
        }
        setShowModal(false);
    }

    function getCustomStatus() {
        if (props.customStatus) {
            const customStatusList = props.customStatus.map((status: any, i: number) =>
                <StatusButton text={status.text} color={status.color} position={i} selectButton={changeStatus} key={i}/>
            );
            return customStatusList;
        }
    }

    if (props.small) {
        return (
            <div>
                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "50px"
                    }}
                >
                    <Card>
                        <CardContent style={{maxWidth: "450px"}}>
                            <Button variant="contained" className={buttonStyling.buttonGreen}
                                    onClick={() => changeStatus(getAvailableButton())}
                            >Available</Button>
                            <Button variant="contained" className={buttonStyling.buttonYellow}
                                    onClick={() => changeStatus(getAwayButton())}
                            >Away</Button>
                            <Button variant="contained" className={buttonStyling.buttonRed}
                                    onClick={() => changeStatus(getBusyButton())}
                            >Do not disturb</Button>
                            {getCustomStatus()}
                        </CardContent>
                    </Card>

                </Modal>
                <Button variant="contained" onClick={() => setShowModal(true)}
                        style={{
                            backgroundColor: status.color,
                            color: "#ffffff",
                            marginTop: "10px",
                            width: 150,
                            height: 55,
                            fontSize: "20px",
                            marginLeft: "19px"
                        }}>
                    {status.text}
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "50px"
                    }}
                >
                    <Card>
                        <CardContent style={{maxWidth: "450px"}}>
                            <Button variant="contained" className={buttonStyling.buttonGreen}
                                    onClick={() => changeStatus(getAvailableButton())}
                            >Available</Button>
                            <Button variant="contained" className={buttonStyling.buttonYellow}
                                    onClick={() => changeStatus(getAwayButton())}
                            >Away</Button>
                            <Button variant="contained" className={buttonStyling.buttonRed}
                                    onClick={() => changeStatus(getBusyButton())}
                            >Do not disturb</Button>
                            {getCustomStatus()}
                        </CardContent>
                    </Card>

                </Modal>
                <Button variant="contained" onClick={() => setShowModal(true)}
                        style={{
                            backgroundColor: status.color,
                            color: "#ffffff",
                            marginTop: "30px",
                            width: 350,
                            height: 90,
                            fontSize: "40px"
                        }}>
                    {status.text}
                </Button>
            </div>
        );
    }
};

interface StatusButtonInfo {
    text: string;
    color: string;
    position: number;

    selectButton(buttonInfo: any): void;
}

const StatusButton = (props: StatusButtonInfo) => {
    return (
        <Button variant="contained" onClick={() => props.selectButton({text: props.text, color: props.color})}
                style={{
                    backgroundColor: props.color,
                    color: "#ffffff",
                    width: "200px",
                    height: "50px",
                    margin: "10px",
                    fontSize: "18px"
                }}>{props.text}</Button>
    )
};