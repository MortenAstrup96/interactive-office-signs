import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {UserInformation} from "../../library/general_interfaces";
import {Customize} from "../../components/userConsole/customize";
import {Status} from "../../components/userConsole/status";
import {Box, Tab, Tabs, ThemeProvider, Typography} from "@material-ui/core";
import {theme} from "../../styles/generalStyles";
import {generateLogEvent} from "../../library/general_functions";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    let {data} = useSWR(() => '/api/user/' + router.query.personId, fetcher);

    /** Tab component */
    function getTabPanel(index: number, value: number, children: any) {
        if (value === index) {
            return (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                >
                    {children}
                </div>
            );
        }
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
            </div>
        );

    }

    useEffect(() => {
        if (data) {
            setCurrentUser(data);
        }
    }, [data]);

    /** --------- API --------- */
    // Updates database via API on status change
    function saveChanges() {
        const nameId = currentUser?.nameId;


        // Posting data
        if (nameId) {
            fetch('/api/user/' + nameId, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(currentUser)
            });
        } else {
            console.log("Error posting data");
        }
    }

    useEffect(() => {
        saveChanges();
    }, [currentUser?.statusButtons, currentUser?.status]);

    function updateStatusButtons(buttonArray: any[], buttonStatus: any) {
        if (currentUser) {
            generateLogEvent(currentUser.nameId, {
                eventType: "Status Change - Console",
                event: {buttonStatus, buttonArray}
            })
        }

        setCurrentUser((prevState: any) => ({
            ...prevState,
            status: buttonStatus,
            statusButtons: buttonArray,
        }));
    }


    function getCustomize() {
        if (currentUser) {
            return (<Customize currentUser={currentUser} setCurrentUser={setCurrentUser} save={saveChanges}/>);
        }
    }

    function getStatus() {
        if (currentUser) {
            return (<Status statusButtons={currentUser?.statusButtons} currentSelection={currentUser?.status}
                            saveChanges={updateStatusButtons}/>);
        }
    }

    // Gets profile data
    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    if (!currentUser) return (<div> Loading... </div>);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    color="primary">
                    <Tab label="Profile"/>
                    <Tab label="Status"/>
                </Tabs>

                {getTabPanel(0, value, getCustomize())}
                {getTabPanel(1, value, getStatus())}

            </ThemeProvider>
        </div>
    );
}