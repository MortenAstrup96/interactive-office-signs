import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";
import {Container} from "@material-ui/core";
import {border} from "@material-ui/system";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";

export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();
    const {data, error} = useSWR(() => 'http://localhost:3000/api/persons/' + router.query.officeId, fetcher);

    useEffect(() => {
        setCurrentOffice(data);
    }, [data])

    async function fetcher(url) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }


    if (error) return <div> Failed to load </div>
    if (!data || !currentOffice) return <div> Loading... </div>

    return (
        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div>
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <AvailabilityComponent status={currentOffice.status}/>
                </div>

            </div>
        </Container>
    );


}

