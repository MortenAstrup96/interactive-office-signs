import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/tablet/header";
import {Container} from "@material-ui/core";
import {Availability} from "../../components/tablet/availability";
import {generalStyle} from "../../styles/generalStyles";

const avatarFake = require("../../img/avataricon.png");

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
            try {
                const avatarReal = require("../../img/profile/" + currentOffice.nameId + ".jpg");
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "400px",
                    width: "400px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="400px"/>);
            }

        }
        return (<img src={avatarFake} alt={avatarFake} width="400px"/>);
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
                    color: "#002546"
                }}>{currentOffice?.title}</p>
                <Availability nameId={currentOffice.nameId} status={currentOffice.status}
                              calendarURL={currentOffice?.calendarURL}/>
            </div>
        </Container>
    );
}

