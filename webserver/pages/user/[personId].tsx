import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {
    Button,
    Container, Divider,
    TextField
} from "@material-ui/core";
import Link from "next/link";
import {UserInformation, ViewData} from "../../library/general_interfaces";


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

    let {data} = useSWR(() => '/api/getUserById/' + router.query.personId, fetcher);

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
        const nameId = currentUser?.nameId;

        // Posting data
        if (nameId) {
            fetch('/api/setUserById/' + nameId, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(currentUser)
            });
        } else {
            console.log("Error posting data");
        }
    }

    function updateImage(viewId: ViewId, viewData: ViewData) {
        switch (viewId) {
            case ViewId.FIRST:
                setCurrentUser((prevState: any) => ({
                    ...prevState,
                    firstView: viewData
                }));
                break;
            case ViewId.SECOND:
                setCurrentUser((prevState: any) => ({
                    ...prevState,
                    secondView: viewData
                }));
                break;
            case ViewId.THIRD:
                setCurrentUser((prevState: any) => ({
                    ...prevState,
                    thirdView: viewData
                }));
                break;
            case ViewId.FOURTH:
                setCurrentUser((prevState: any) => ({
                    ...prevState,
                    fourthView: viewData
                }));
                break;
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


    function getCards() {
        if (!currentUser) {
            return <h4>Unable to load cards</h4>
        } else {
            switch (currentViewType) {
                case ViewType.SINGLE:
                    return <SingleView firstView={currentUser.firstView} consoleMode={true} updateView={updateImage}/>;
                case ViewType.DOUBLE:
                    return <DoubleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                       consoleMode={true} updateView={updateImage}/>;
                case ViewType.TRIPLE:
                    return <TripleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                       thirdView={currentUser.thirdView} consoleMode={true} updateView={updateImage}/>
                case ViewType.QUADRUPLE:
                    return <QuadrupleView firstView={currentUser.firstView} secondView={currentUser.secondView}
                                          thirdView={currentUser.thirdView} fourthView={currentUser.fourthView}
                                          consoleMode={true} updateView={updateImage}/>;
                case ViewType.CUSTOM:
                    return <CustomView customView={currentUser.customView}/>;
                default:
                    return <h4>Unable to load the cards</h4>
            }
        }
    }


    console.log(currentUser);
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