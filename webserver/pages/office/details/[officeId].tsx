import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../../components/office/header";
import {Card, CardContent, CardMedia, Container} from "@material-ui/core";
import {Availability} from "../../../components/office/availability";
import {serverName} from "../../../library/constants";
import {VegaLite} from "react-vega/lib";
import {DataType} from "../../../library/enums";
import {ImageCard} from "../../../components/office/imageCard";
import Masonry from "react-masonry-component";
import {makeStyles} from "@material-ui/core/styles";


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
                </div>
            </div>
        </Container>
    );
};