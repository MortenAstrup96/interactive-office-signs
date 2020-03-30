import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/office/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";
import {serverName} from "../../library/constants";
import {textAlign} from "@material-ui/system";

const avatar = require("../../img/avataricon.png");
const style = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    width: '50%',
}
const textStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    margin: '0 auto',
    fontFamily: 'Roboto',
}

export default function OfficeInformationId() {

    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    let {data, revalidate} = useSWR(() => serverName + '/api/getUserById/' + router.query.officeId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data, revalidate]);

    async function fetcher(url: any) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }

    if (!data || !currentOffice) return (<div> Loading... </div>);

    return (
        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div style={style}>
                    <img src={avatar} alt="Error loading image.." width="500"/>
                </div>
                <div style={textStyle}>
                    <h1>{currentOffice.name}</h1>
                </div>
                <div style={textStyle}>
                    <h2>{currentOffice.mail}</h2>
                </div>
                <div style={textStyle}>
                    <AvailabilityComponent nameId={currentOffice.nameId} status={currentOffice.status}/>
                </div>
            </div>
        </Container>
    );
}

