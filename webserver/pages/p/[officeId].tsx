import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/header";

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


    console.log(data);
    if (error) return <div> Failed to load </div>
    if (!data) return <div> Loading... </div>

    return (
        <div>
            <Header/>
            <h1>{router.query.officeId}</h1>
            <h2>{data.nameId}</h2>
        </div>
    );


}

