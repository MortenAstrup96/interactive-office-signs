import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";
import {serverName} from "../../library/constants";

const avatar = require("../../img/avataricon.png");

export default function OfficeInformationId() {

    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();
    let {data, revalidate } = useSWR(() => serverName +'/api/getPersonById/' + router.query.officeId, fetcher, {
        // revalidate the data per second
        refreshInterval: 200
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data, revalidate]);

    async function fetcher(url) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }

    if (!data || !currentOffice) return (<div> Loading... </div>);

    return (
        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div>
                    <img src={avatar} />
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <AvailabilityComponent nameId={currentOffice.nameId} status={currentOffice.status}/>
                </div>
            </div>
        </Container>
    );
}

