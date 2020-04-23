import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../../components/tablet/header";
import {Card, CardContent, CardMedia, Container} from "@material-ui/core";
import {serverName} from "../../../library/constants";
import {DataType, ViewType} from "../../../library/enums";
import {SingleView} from "../../../components/userConsole/viewTypes/singleView";
import {DoubleView} from "../../../components/userConsole/viewTypes/doubleView";
import {TripleView} from "../../../components/userConsole/viewTypes/tripleView";
import {QuadrupleView} from "../../../components/userConsole/viewTypes/quadrupleView";
import {CustomView} from "../../../components/userConsole/viewTypes/customView";
import {generalStyle} from "../../../styles/generalStyles";
import {Calendar} from "../../../components/tablet/calendar";

const avatarFake = require("../../../img/avataricon.png");

export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();
    const [vega, setVega] = useState<any>();
    const generalStyling = generalStyle();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    const {data, error} = useSWR(() => serverName + '/api/getUserById/' + router.query.officeId, fetcher, {
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
                    height: "250px",
                    width: "250px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="400px"/>);
            }

        }
        return (<img src={avatarFake} alt={avatarFake} width="400px"/>);
    }

    async function fetcher(url: string) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
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
    if (!data || !currentOffice) return (<div><Header office={""} nameId={""}/></div>);


    return (

        <Container>
            <div>
                <Header office={currentOffice?.officeId} nameId={currentOffice?.nameId}/>
                <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                    <div className={generalStyling.officeDetail}>
                        {getProfileImage()}
                        <p>{currentOffice.name}</p>
                        <p>{currentOffice.mail}</p>
                    </div>
                <div style={{textAlign: "center"}}>
                   <Calendar url={currentOffice?.calendarURL}/>
                    {getImages()}
                </div>
                </div>
            </div>
        </Container>
    );
};