import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/tablet/header";
import {Container} from "@material-ui/core";
import {Availability} from "../../components/tablet/availability";
import {generalStyle} from "../../styles/generalStyles";

export default function OfficeInformationId() {

    const router = useRouter();
    const generalStyling = generalStyle();
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();
    console.log(router.query.personId);

    // Will get the person by ID in the URL and revalidate every 10 seconds
    let {data, revalidate} = useSWR(() => '/api/user/' + router.query.personId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
        console.log(data);
    }, [data, revalidate]);


    function getProfileImage() {
        if (currentOffice?.nameId) {
            return (<img style={{
                objectFit: "cover",
                borderRadius: "50%",
                height: "450px",
                width: "450px",
                backgroundImage: "url('../../static/avataricon.png')",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat"
            }} src={"../../static/" + currentOffice.nameId + ".jpg"}/>)
        }
    }

    async function fetcher(url: any) {
        if (router.query.personId) {
            return fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(r => r.json());
        }
    }

    if (!data || !currentOffice) return (<div></div>);

    return (
        <Container style={{height: "110%"}}>
            <Header office={currentOffice?.office} nameId={currentOffice?.nameId} name={currentOffice?.name}
                    mail={currentOffice?.mail}/>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {getProfileImage()}
                <h1 className={generalStyling.office}>{currentOffice.name}</h1>
                <p style={{
                    fontSize: "30px",
                    margin: "5px",
                    marginBottom: "30px",
                    fontFamily: "Roboto"
                }}>{currentOffice?.title}</p>
                <Availability nameId={currentOffice.nameId} status={currentOffice.status}
                              calendarURL={currentOffice?.calendarURL} customStatus={currentOffice?.statusButtons}/>
            </div>
        </Container>
    );
}