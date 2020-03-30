import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField
} from "@material-ui/core";
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
    const [imagePath, setImagePath] = useState<string>("");
    const [topViewDisplay, setTopViewDisplay] = useState<ViewType>(ViewType.EMPTY);

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
        const topView = getSelectedObject();
        const status = currentStatus;


        // Posting data
        fetch(serverName + '/api/setUserById/' + currentNameId, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId: currentNameId}, {status}, {topView}))
        });
    }

    function getSelectedObject() {
        switch (topViewDisplay) {
            case ViewType.VEGA:
                return ({viewType: ViewType.VEGA, data: vegaData});
                break;
            case ViewType.IMAGE:
                return ({viewType: ViewType.IMAGE, data: imagePath});
            default:
                return ({viewType: ViewType.EMPTY, data: ""});
        }
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(vegaData);
            return (<VegaLite spec={parsedVega}/>);
        } catch (e) {
            return (<h4>Visualisation unable to compile</h4>)
        }

    }

    function getImgView() {
        try {
            return (<img src={imagePath} height="300px"/>)
        } catch (e) {
            return (<h4>Unable to display image</h4>)
        }

    }

    function handleRadioChange(event: any) {
        setTopViewDisplay(event.target.value);
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

            <FormControl component="fieldset">
                <FormLabel component="legend">Type to display on tablet</FormLabel>
                <RadioGroup aria-label="Type to display on tablet" name="tabletDisplay" value={topViewDisplay}
                            onChange={handleRadioChange}>
                    <FormControlLabel value={ViewType.IMAGE} control={<Radio/>} label="Image"/>
                    <FormControlLabel value={ViewType.VEGA} control={<Radio/>} label="Vega-Lite"/>
                    <FormControlLabel value={ViewType.EMPTY} control={<Radio/>} label="Empty"/>
                </RadioGroup>
            </FormControl>

            <div style={{alignContent: "center"}}>
                <div>
                    <TextareaAutosize value={vegaData}
                                      onChange={(e) => setVegaData(e.target.value)}/>

                    {getVegaView()}
                </div>
                <div>
                    <TextField label="Image" value={imagePath}
                               onChange={(e) => setImagePath(e.target.value)}/>
                    {getImgView()}
                </div>
            </div>

        </Container>
    );
}

