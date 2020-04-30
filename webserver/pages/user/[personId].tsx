import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {UserInformation} from "../../library/general_interfaces";
import {Customize} from "../../components/userConsole/customize";
import {Status} from "../../components/userConsole/status";
import {Box, Tab, Tabs, Typography} from "@material-ui/core";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();
    let {data} = useSWR(() => '/api/user/' + router.query.personId, fetcher);

    /** Tab component */
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={2}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function allyProps(index: any) {
        return {
            id: `simple-tab${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

        const [value, setValue] = React.useState(0);
        const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
        };

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
        setCurrentUser((prevState: any) => ({
            ...prevState,
            status: buttonStatus,
            statusButtons: buttonArray,
        }));
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
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    aria-label="simple tabs example"
                >
                    <Tab label="Profile" {...allyProps(0)} />
                    <Tab label="Status" {...allyProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Customize currentUser={currentUser} setCurrentUser={setCurrentUser} save={saveChanges}/>
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <Status statusButtons={currentUser?.statusButtons} currentSelection={currentUser?.status} saveChanges={updateStatusButtons}/>
                </TabPanel>
        </div>
    );
}