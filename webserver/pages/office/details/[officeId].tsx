import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../../components/tablet/header";
import {Card, CardContent, CardMedia, Container} from "@material-ui/core";
import {Availability} from "../../../components/tablet/availability";
import {serverName} from "../../../library/constants";
import {VegaLite} from "react-vega/lib";
import {DataType, ViewType} from "../../../library/enums";
import {ImageCard} from "../../../components/tablet/imageCard";
import Masonry from "react-masonry-component";
import {makeStyles} from "@material-ui/core/styles";
import {SingleView} from "../../../components/userConsole/viewTypes/singleView";
import {DoubleView} from "../../../components/userConsole/viewTypes/doubleView";
import {TripleView} from "../../../components/userConsole/viewTypes/tripleView";
import {QuadrupleView} from "../../../components/userConsole/viewTypes/quadrupleView";
import {CustomView} from "../../../components/userConsole/viewTypes/customView";


export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();
    const [vega, setVega] = useState<any>();


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


    async function fetcher(url: string) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }

    function getImages() {
        switch (currentOffice?.viewType) {
            case ViewType.SINGLE:
                return <SingleView firstView={currentOffice.firstView} consoleMode={true}/>;
            case ViewType.DOUBLE:
                return <DoubleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                   consoleMode={true}/>;
            case ViewType.TRIPLE:
                return <TripleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                   thirdView={currentOffice.thirdView} consoleMode={true}/>
            case ViewType.QUADRUPLE:
                return <QuadrupleView firstView={currentOffice.firstView} secondView={currentOffice.secondView}
                                      thirdView={currentOffice.thirdView} fourthView={currentOffice.fourthView}
                                      consoleMode={true}/>;
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
                <div style={{textAlign: "center"}}>
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <Availability nameId={currentOffice.nameId} status={currentOffice.status}/>
                    {getImages()}
                </div>
            </div>
        </Container>
    );
};