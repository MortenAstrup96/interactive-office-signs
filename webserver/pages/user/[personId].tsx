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


import {setPropValue} from "../../library/general_functions";
import {ViewControls} from "../../components/userConsole/viewControls";
import {ImageView} from "../../components/userConsole/imageView";
import {ProfileSettings} from "../../components/userConsole/profileSettings";
import {DoubleView} from "../../components/userConsole/viewTypes/doubleView";
import {DataType, ViewId, ViewType} from "../../library/enums";
import {SingleView} from "../../components/userConsole/viewTypes/singleView";
import {TripleView} from "../../components/userConsole/viewTypes/tripleView";
import {QuadrupleView} from "../../components/userConsole/viewTypes/quadrupleView";
import {CustomView} from "../../components/userConsole/viewTypes/customView";


export default function Index() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<UserInformation>();
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [currentViewType, setCurrentViewType] = useState<string>("");

    let {data} = useSWR(() => serverName + '/api/getUserById/' + router.query.personId, fetcher);

    useEffect(() => {
        if (data) {
            setCurrentUser(data);
            setCurrentStatus(data?.status);
            setCurrentViewType(data?.viewType);
        }
    }, [data]);

    useEffect(() => {
        if (currentUser) {
            setCurrentViewType(currentUser.viewType);
        }

    }, [currentUser]);

    /** ----- API ----- */
    // Updates database via API on status change
    function saveChanges() {
        // Create object to Post
        const status = currentUser?.status;
        const nameId = currentUser?.nameId;

        // Posting data
        if (nameId) {
            fetch(serverName + '/api/setUserById/' + nameId, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(Object.assign({nameId: nameId}, {status}))
            });
        } else {
            console.log("Error posting data");
        }
    }

    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    /** ----- USER INTERFACE ----- */
    function updateViewType(viewType: string) {
        setCurrentUser((prevState: any) => ({
            ...prevState,
            viewType: viewType,
        }))
    }

    function postViewData(viewId: ViewId) {
        //currentUser?.firstView.dataType = DataType.IMAGE;
        //currentUser?.secondView.data = "https://cdn.pixabay.com/photo/2018/05/31/15/06/not-hear-3444212_960_720.jpg"
        console.log(viewId);
    }

    function getCards() {
        if (!currentUser) {
            return <h4>Unable to load cards</h4>
        } else {
            switch (currentViewType) {
                case ViewType.SINGLE:
                    return <SingleView firstView={currentUser.firstView} updateView={postViewData}/>;
                case ViewType.DOUBLE:
                    return <DoubleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                       updateView={postViewData}/>;
                case ViewType.TRIPLE:
                    return <TripleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                       thirdView={currentUser.thirdView} updateView={postViewData}/>
                case ViewType.QUADRUPLE:
                    return <QuadrupleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                          thirdView={currentUser.thirdView} fourthView={currentUser.fourthView}
                                          updateView={postViewData}/>;
                case ViewType.CUSTOM:
                    return <CustomView customView={currentUser.customView}/>;
                default:
                    return <h4>Unable to load the cards</h4>
            }
        }
    }


    if (!currentUser) return (<div> Loading... </div>);

    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

            <ProfileSettings user={currentUser}/>
            <Divider variant="fullWidth" style={{width: "700px", marginTop: "30px", marginBottom: "20px"}}/>
            <ViewControls currentViewType={currentViewType} updateViewType={updateViewType}/>
            {getCards()}
            <Divider variant="fullWidth" style={{width: "700px", marginTop: "30px", marginBottom: "20px"}}/>
            <Button variant="contained" color="primary"
                    onClick={() => saveChanges()}>Save</Button>
            <h2>Currently Status:</h2>
            <h3>{currentUser.status}</h3>
            <Link href="https://vega.github.io/editor/#/">https://vega.github.io/editor/#/</Link>

            <div style={{margin: "30px", width: "600px"}}>
                <Button variant="contained" color="primary"
                        onClick={() => setPropValue(currentUser, "status", "Available")}>Available</Button>
                <Button variant="contained" color="secondary"
                        onClick={() => setPropValue(currentUser, "status", "Busy")}>Busy</Button>
            </div>
            <div style={{margin: "30px", width: "600px"}}>
                <TextField type="text" value={currentUser?.status}
                           variant="outlined"
                           label="Status Message"/>
            </div>
        </Container>
    );
}

/** https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
 *
 onChange={(e) => setCurrentUser((prevState: any) => ({
                               ...prevState,
                               status: e.target.value, })
                           }*/