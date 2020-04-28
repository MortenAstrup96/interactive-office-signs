import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {UserInformation} from "../../library/general_interfaces";
import {Customize} from "../../components/userConsole/customize";
import {Status} from "../../components/userConsole/status";
import {Tab, Tabs} from "@material-ui/core";

export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();
    let {data} = useSWR(() => '/api/user/' + router.query.personId, fetcher);

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
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Profile" />
                <Tab label="Status" />
            </Tabs>
        <Customize currentUser={currentUser} setCurrentUser={setCurrentUser} save={saveChanges}/>
            <Status statusButtons={currentUser?.statusButtons} currentSelection={currentUser?.status}
                    saveChanges={updateStatusButtons}/>
        </div>
    );
}

// Customize component:
// <Customize currentUser={currentUser} setCurrentUser={setCurrentUser} save={saveChanges}/>