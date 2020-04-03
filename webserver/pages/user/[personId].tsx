import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {
    Button,
    Container, Divider,
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

const avatarFake = require("../../img/avataricon.png");


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
            return (<img src={imagePath} height="300px" alt="Unable to display image"/>)
        } catch (e) {
            return (<h4>Unable to display image</h4>)
        }

    }

    function handleRadioChange(event: any) {
        setTopViewDisplay(event.target.value);
    }

    function getProfilePicture() {
        if (currentUser) {
            try {
                const avatarReal = require("../../img/profile/" + currentUser.nameId + ".jpg");
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "150px",
                    width: "150px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="150px"/>);
            }
        }
        return (<img src={avatarFake} alt={avatarFake} width="150px"/>);
    }

    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    const uploadFile = async (e: any) => {
        const file = e.currentTarget.files[0];
        if (currentUser) {
            await fetch("/api/uploadImageById/" + currentUser.nameId, {
                method: "POST",
                headers: {
                    "Content-Type": file.type
                },
                body: file
            });
        }

    };

    if (!data) return (<div> Loading... </div>);

    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{margin: "30px", width: "600px"}}>
                <h1>PROFILE SETTINGS</h1>


                <div style={{display: "grid", gridTemplateColumns: "200px 300px"}}>
                    {getProfilePicture()}
                    <input type="file" onChange={uploadFile}/>
                    <TextField id="outlined-basic" label="Name" variant="outlined" size="small"
                               style={{width: 200, margin: "10px"}}/>

                    <TextField id="outlined-basic" label="Mail" variant="outlined" size="small"
                               style={{width: 200, margin: "10px"}}/>
                </div>

                <Divider variant="middle"/>


                <Button variant="contained" color="primary"
                        onClick={() => saveChanges()}>Save</Button>
                <h2>Currently Status:</h2>
                <h3>{currentStatus}</h3>
                <Link href="https://vega.github.io/editor/#/">https://vega.github.io/editor/#/</Link>
            </div>

            <div style={{margin: "30px", width: "600px"}}>
                <Button variant="contained" color="primary"
                        onClick={() => setCurrentStatus("Available")}>Available</Button>
                <Button variant="contained" color="secondary" onClick={() => setCurrentStatus("Busy")}>Busy</Button>
            </div>
            <div style={{margin: "30px", width: "600px"}}>
                <TextField type="text" value={currentStatus}
                           onChange={(e) => setCurrentStatus(e.target.value)} variant="outlined"
                           label="Status Message"/>
            </div>
            <div style={{margin: "30px", width: "600px"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Type to display on tablet</FormLabel>
                    <RadioGroup aria-label="Type to display on tablet" name="tabletDisplay" value={topViewDisplay}
                                onChange={handleRadioChange}>
                        <FormControlLabel value={ViewType.IMAGE} control={<Radio/>} label="Image"/>
                        <FormControlLabel value={ViewType.VEGA} control={<Radio/>} label="Vega-Lite"/>
                        <FormControlLabel value={ViewType.EMPTY} control={<Radio/>} label="Empty"/>
                    </RadioGroup>
                </FormControl>
                <Divider variant="middle"/>
            </div>
            <div style={{alignContent: "center", width: "600px"}}>
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

