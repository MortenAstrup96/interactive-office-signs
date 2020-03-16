import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";
import {Container} from "@material-ui/core";
import {border} from "@material-ui/system";

export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();
    const {data, error} = useSWR(() => 'http://localhost:3000/api/persons/' + router.query.officeId, fetcher);

    useEffect(() => {
        setCurrentOffice(data);
    }, [data])

    async function fetcher(url) {
        return fetch(url).then(r => r.json());
    }


    if (error) return <div> Failed to load </div>
    if (!data || !currentOffice) return <div> Loading... </div>

    return (
        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div style={{textAlign: "center"}}>
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <h2>{currentOffice.status}</h2>
                </div>
            </div>
        </Container>
    );


}

