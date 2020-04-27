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
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();
    const generalStyling = generalStyle();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    let {data, revalidate} = useSWR(() => '/api/user/' + router.query.officeId, fetcher, {
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
        if (router.query.officeId) {
            return fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(r => r.json());
        }
    }

    if (!data || !currentOffice) return (<div><Header office={""} nameId={""}/></div>);

    return (
        <Container>
            <div>
                <Header office={currentOffice?.officeId} nameId={currentOffice?.nameId}/>
                <div className={generalStyling.office}>
                    {getProfileImage()}
                </div>
                <div className={generalStyling.office}>
                    <h1>{currentOffice.name}</h1>
                </div>
                <div className={generalStyling.office}>
                    <h2>{currentOffice.mail}</h2>
                </div>
                <div className={generalStyling.office}>
                    <Availability nameId={currentOffice.nameId} status={currentOffice.status}
                                  calendarURL={currentOffice?.calendarURL}/>
                </div>
            </div>
        </Container>
    );
}

