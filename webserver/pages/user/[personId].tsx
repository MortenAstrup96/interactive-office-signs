import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {UserInformation} from "../../library/general_interfaces";
import {Status} from "../../components/userConsole/status";


export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();
    let {data} = useSWR(() => '/api/user/' + router.query.personId, fetcher);

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
    }, [currentUser?.statusButtons])

    function updateStatusButtons(buttonArray: any[]) {
        setCurrentUser((prevState: any) => ({
            ...prevState,
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
            <Status statusButtons={currentUser?.statusButtons} saveChanges={updateStatusButtons}/>
        </div>
    );
}

// Customize component:
// <Customize currentUser={currentUser} setCurrentUser={setCurrentUser} save={saveChanges}/>