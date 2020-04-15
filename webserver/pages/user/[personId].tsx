import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {
    Button,
    Container, Divider,
    TextField
} from "@material-ui/core";
import {serverName} from "../../library/constants";
import Link from "next/link";
import {UserInformation} from "../../library/general_interfaces";

import IconPerson from "../../components/icons/iconPerson";
import IconMail from "../../components/icons/iconMail";
import {getPropString, setPropValue} from "../../library/general_functions";

const avatarFake = require("../../img/avataricon.png");


export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();

    let {data} = useSWR(() => serverName + '/api/getUserById/' + router.query.personId, fetcher);

    useEffect(() => {
        if (data) {
            setCurrentUser(data);
        }
    }, [data]);


    /** ----- API ----- */
    // Updates database via API on status change
    function saveChanges() {
        // Create object to Post
        const status = currentUser?.status;
        const nameId = currentUser?.nameId;
        const customView = currentUser?.customView;

        // Posting data
        if (nameId) {
            fetch(serverName + '/api/setUserById/' + nameId, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(Object.assign({nameId: nameId}, {status}, {customView}))
            });
        } else {
            console.log("Error posting data");
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

    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    /** ----- USER INTERFACE ----- */
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


    if (!data) return (<div> Loading... </div>);

    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{margin: "30px", width: "600px"}}>
                <h1>PROFILE SETTINGS</h1>
                <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                    <div>
                        {getProfilePicture()}
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Change Picture
                            <input
                                type="file"
                                onChange={uploadFile}
                                style={{display: "none"}}
                            />
                        </Button>
                    </div>

                    <div style={{marginRight: "20px", marginTop: "30px"}}>
                        <div>
                            <IconMail/>
                            <TextField id="outlined-basic" label="Name" value={currentUser?.name} variant="outlined"
                                       size="small"
                                       style={{width: "280px"}}/>
                        </div>

                        <div>
                            <IconPerson/>
                            <TextField id="outlined-basic" label="Mail" value={currentUser?.mail} variant="outlined"
                                       size="small"
                                       style={{width: "280px"}}/>
                        </div>


                    </div>

                </div>

                <Divider variant="fullWidth" style={{marginTop: "30px", marginBottom: "20px"}}/>


                <Button variant="contained" color="primary"
                        onClick={() => saveChanges()}>Save</Button>
                <h2>Currently Status:</h2>
                <h3>{currentUser?.status}</h3>
                <Link href="https://vega.github.io/editor/#/">https://vega.github.io/editor/#/</Link>
            </div>

            <div style={{margin: "30px", width: "600px"}}>
                <Button variant="contained" color="primary"
                        onClick={() => setPropValue(currentUser, "status", "Available")}>Available</Button>
                <Button variant="contained" color="secondary"
                        onClick={() => setPropValue(currentUser, "status", "Busy")}>Busy</Button>
            </div>
            <div style={{margin: "30px", width: "600px"}}>
                <TextField type="text" value={getPropString(currentUser, "status")}
                           onChange={(e) => setPropValue(currentUser, "status", e.target.value)} variant="outlined"
                           label="Status Message"/>
            </div>
        </Container>
    );
}

