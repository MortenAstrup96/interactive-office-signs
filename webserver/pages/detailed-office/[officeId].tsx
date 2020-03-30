import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/office/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../components/office/availabilityComponent";
import {serverName} from "../../library/constants";
import {VegaLite} from "react-vega/lib";


export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    const {data, error} = useSWR(() => serverName + '/api/getUserById/' + router.query.officeId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data]);

    async function fetcher(url) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }

    const spec: any = {
        description: "A simple bar chart with embedded data.",
        mark: "bar",
        encoding: {
            "x": {"field": "a", "type": "ordinal", "axis": {"labelAngle": 0}},
            "y": {"field": "b", "type": "quantitative"}
        },
        data: {name: 'table'}, // note: vega-lite data attribute is a plain object instead of an array
    };

    const barData = {
        table: [
            {a: 'A', b: 28},
            {a: 'B', b: 55},
            {a: 'C', b: 43},
            {a: 'D', b: 91},
            {a: 'E', b: 81},
            {a: 'F', b: 53},
            {a: 'G', b: 19},
            {a: 'H', b: 87},
            {a: 'I', b: 52},
        ],
    };

    if (error) return (<div> Failed to load </div>);
    if (!data || !currentOffice) return (<div> Loading... </div>);


    return (

        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div style={{textAlign: "center"}}>
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <AvailabilityComponent nameId={currentOffice.nameId} status={currentOffice.status}/>
                </div>
            </div>
            <VegaLite spec={spec} data={barData}/>
        </Container>
    );


}

