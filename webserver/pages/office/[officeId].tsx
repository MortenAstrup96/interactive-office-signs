import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";

const avatar = require("../../img/avataricon.png");

export default function OfficeInformationId() {

    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();
    const {data, error} = useSWR(() => 'http://localhost:3000/api/getPersonById/' + router.query.officeId, fetcher);

    useEffect(() => {
        setCurrentOffice(data);
    }, [data]);

    async function fetcher(url) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }


    if (error) return (<div> Failed to load </div>);
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

