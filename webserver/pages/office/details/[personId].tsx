import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../../components/tablet/header";
import {Container} from "@material-ui/core";
import {ViewType} from "../../../library/enums";
import {SingleView} from "../../../components/userConsole/viewTypes/singleView";
import {DoubleView} from "../../../components/userConsole/viewTypes/doubleView";
import {TripleView} from "../../../components/userConsole/viewTypes/tripleView";
import {QuadrupleView} from "../../../components/userConsole/viewTypes/quadrupleView";
import {CustomView} from "../../../components/userConsole/viewTypes/customView";
import {Availability} from "../../../components/tablet/availability";

const avatarFake = require("../../../img/avataricon.png");

export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();
    const [vega, setVega] = useState<any>();


    // Will get the person by ID in the URL and revalidate every 10 seconds
    const {data, error} = useSWR(() => '/api/user/' + router.query.personId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data]);

    useEffect(() => {
        if (currentOffice && currentOffice.firstView && currentOffice.firstView.data) {
            setVega(currentOffice.firstView.data);
        }
    }, [currentOffice]);


    function getProfileImage() {
        if (currentOffice?.nameId) {
            try {
                const avatarReal = require("../../../img/profile/" + currentOffice.nameId + ".jpg");
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "220px",
                    width: "220px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="220px"/>);
            }
        }
        return (<img src={avatarFake} alt={avatarFake} width="220px"/>);
    }

    async function fetcher(url: string) {
        if (router.query.personId) {
            return fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(r => r.json());
        }
    }

    function getImages() {
        switch (currentOffice?.viewType) {
            case ViewType.SINGLE:
                return <SingleView firstView={currentOffice.firstView} consoleMode={false}/>;
            case ViewType.DOUBLE:
                return <DoubleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                   consoleMode={false}/>;
            case ViewType.TRIPLE:
                return <TripleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                   thirdView={currentOffice.thirdView} consoleMode={false}/>
            case ViewType.QUADRUPLE:
                return <QuadrupleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                      thirdView={currentOffice.thirdView} fourthView={currentOffice.fourthView}
                                      consoleMode={false}/>;
            case ViewType.CUSTOM:
                return <CustomView customView={currentOffice.customView}/>;
            default:
                return <h4>Unable to load the cards</h4>
        }
    }

    if (error) return (<div> Failed to load </div>);
    if (!data || !currentOffice) return (<div></div>);


    return (
        <Container>
            <div>
                <Header office={currentOffice?.office} nameId={currentOffice?.nameId} name={currentOffice?.name}
                        mail={currentOffice?.mail}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {getProfileImage()}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "30px",
                        justifyContent: "center"
                    }}>
                        <h1 style={{
                            margin: "5px",
                            marginLeft: "20px",
                            fontSize: "38px",
                            marginBottom: 0,
                            letterSpacing: "2px"
                        }}>{currentOffice.name}</h1>
                        <p style={{
                            margin: "5px",
                            marginLeft: "20px",
                            fontSize: "22px",
                            marginTop: 0
                        }}>{currentOffice?.title}</p>
                        <p style={{
                            margin: "5px",
                            marginLeft: "20px",
                            fontSize: "18px"
                        }}>{currentOffice.mail}</p>
                        <Availability nameId={currentOffice.nameId} status={currentOffice.status}
                                      calendarURL={currentOffice?.calendarURL} small={true}/>
                    </div>

                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
                    {getImages()}
                </div>


            </div>
        </Container>
    );
};