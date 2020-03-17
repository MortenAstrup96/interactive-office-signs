import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";
import {serverName} from "../../library/constants";

const avatar = require("../../img/avataricon.png");

export default function PersonOverview() {
    const router = useRouter();
    const [currentPerson, setCurrentPerson] = useState<OfficeInformationProps>();
    let {data, error } = useSWR(() => serverName +'/api/getPersonById/' + router.query.personId, fetcher);

    useEffect(() => {
        setCurrentPerson(data);
    }, [data]);

    async function fetcher(url) {
        if (router.query.personId) {
            return fetch(url).then(r => r.json());
        }
    }

    if (!data) return (<div> Loading... </div>);

    return (
        <Container>

        </Container>
    );
}

