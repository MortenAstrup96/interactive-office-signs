import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {Button, Container, TextField} from "@material-ui/core";
import {serverName} from "../../library/constants";

export default function Index() {
    const router = useRouter();
    const [currentStatus, setCurrentStatus] = useState("");
    const [currentNameId, setCurrentNameId] = useState("");
    let {data} = useSWR(() => serverName + '/api/getPersonById/' + router.query.personId, fetcher);

    useEffect(() => {
        if (data) {
            setCurrentStatus(data.status);
            setCurrentNameId(data.nameId);
        }
    }, [data]);

    // Updates database via API on status change
    useEffect(() => {
        fetch(serverName + '/api/setStatusById/' + currentNameId, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId: currentNameId}, {status: currentStatus}))
        });
    }, [currentStatus]);

    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    if (!data) return (<div> Loading... </div>);

    return (
        <Container>
            <div style={{margin: "30px"}}>
                <h1>User Dashboard</h1>
                <h2>Currently Status:</h2>
                <h3>{currentStatus}</h3>
            </div>

            <div style={{margin: "30px"}}>
                <Button variant="contained" color="primary"
                        onClick={() => setCurrentStatus("Available")}>Available</Button>
                <Button variant="contained" color="secondary" onClick={() => setCurrentStatus("Busy")}>Busy</Button>
            </div>
            <div style={{margin: "30px"}}>
                <TextField type="text" value={currentStatus}
                           onChange={(e) => setCurrentStatus(e.target.value)} variant="outlined"
                           label="Status Message"/>

            </div>
        </Container>
    );
}

