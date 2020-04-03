import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {OfficeInformationProps} from "../../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../../components/office/header";
import {Container} from "@material-ui/core";
import {AvailabilityComponent} from "../../../components/office/availabilityComponent";
import {serverName} from "../../../library/constants";
import {VegaLite} from "react-vega/lib";
import {ViewType} from "../../../library/enums";


export default function OfficeInformationId() {
    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<OfficeInformationProps>();
    const [vega, setVega] = useState<any>();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    const {data, error} = useSWR(() => serverName + '/api/getUserById/' + router.query.officeId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data]);

    useEffect(() => {
        if (currentOffice && currentOffice.topView && currentOffice.topView.data) {
            setVega(currentOffice.topView.data);
        }
    }, [currentOffice]);


    function getCustomView() {
        if (currentOffice?.topView?.viewType === ViewType.VEGA) {
            return getVegaView();
        } else if (currentOffice?.topView?.viewType === ViewType.IMAGE) {
            return getImgView();
        }
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(vega);
            return (<VegaLite spec={parsedVega}/>);
        } catch (e) {
            return (<h4>Visualisation unable to compile</h4>)
        }
    }

    function getImgView() {
        try {
            return (<img src={vega} height="400px" alt="Unable to display image"/>)
        } catch (e) {
            return (<h4>Unable to display image</h4>)
        }
    }

    async function fetcher(url: string) {
        if (router.query.officeId) {
            return fetch(url).then(r => r.json());
        }
    }


    if (error) return (<div> Failed to load </div>);
    if (!data || !currentOffice) return (<div><Header office={""}/></div>);


    return (

        <Container>
            <div>
                <Header office={currentOffice.nameId}/>
                <div style={{textAlign: "center"}}>
                    <h2>{currentOffice.name}</h2>
                    <h2>{currentOffice.mail}</h2>
                    <AvailabilityComponent nameId={currentOffice.nameId} status={currentOffice.status}/>
                    // Simple Calendar from outlook
                    <iframe src="https://outlook.live.com/calendar/published/8b7e4858-fb96-494a-9f6a-92f2f78424d5/2e1a95c1-d3fd-4928-949a-b26020cbcbbb/cid-C17783A928EABA93/calendar.html" width={1000} height={700}></iframe>
                </div>
            </div>
            {getCustomView()}

        </Container>
    );
}

