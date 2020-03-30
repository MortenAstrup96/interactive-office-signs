import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {Button, Container, TextareaAutosize, TextField} from "@material-ui/core";
import {serverName} from "../../library/constants";
import {VegaLite} from "react-vega/lib";
import Link from "next/link";
import {ViewType} from "../../library/enums";
import {OfficeInformationProps} from "../../library/general_interfaces";


export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<OfficeInformationProps>();
    const [currentStatus, setCurrentStatus] = useState("");
    const [currentNameId, setCurrentNameId] = useState("");
    const [vegaData, setVegaData] = useState<any>("");
    let {data} = useSWR(() => serverName + '/api/getUserById/' + router.query.personId, fetcher);

    useEffect(() => {
        if (data) {
            setCurrentUser(data);
            setCurrentStatus(data.status);
            setCurrentNameId(data.nameId);
        }
    }, [data]);

    // Updates database via API on status change
    function saveChanges() {
        // Create object to Post
        const topView = {
            viewType: ViewType.VEGA,
            data: vegaData
        };
        const status = currentStatus;


        // Posting data
        fetch(serverName + '/api/setUserById/' + currentNameId, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId: currentNameId}, {status}, {topView}))
        });
    }

    function getJSON() {
        try {
            const parsedVega = JSON.parse(vegaData);
            return (<VegaLite spec={parsedVega}/>);
        } catch (e) {
            return (<h4>Visualisation unable to compile</h4>)
        }

    }

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
                <Button variant="contained" color="primary"
                        onClick={() => saveChanges()}>Save</Button>
                <h2>Currently Status:</h2>
                <h3>{currentStatus}</h3>
                <Link href="https://vega.github.io/editor/#/">https://vega.github.io/editor/#/</Link>
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

            <TextareaAutosize value={vegaData}
                              onChange={(e) => setVegaData(e.target.value)}/>

            {getJSON()}
        </Container>
    );
}

