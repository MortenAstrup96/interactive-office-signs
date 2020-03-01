import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";

export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>({
        nameId: "",
        name: "",
        status: "",
        mail: ""
    });

    const {data, error} = useSWR(() => 'http://localhost:3000/api/persons/7913', fetcher);

    useEffect(() => {
        if (!data) {
            currentOffice.name = "Loading"
        }

        setCurrentOffice({
            nameId: data?.nameId,
            name: data?.name,
            mail: data?.mail,
            status: data?.status
        })


    }, [router, data])


    async function fetcher(url) {
        return fetch(url).then(r => r.json());
    }

    return (
        <div>
            <h1>{router.query.id}</h1>
            <h1>{currentOffice.name}</h1>
            <h2>{currentOffice.nameId}</h2>
            <h2>{currentOffice.mail}</h2>
            <h2>{currentOffice.status}</h2>
        </div>
    );
}

