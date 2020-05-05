import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {UserInformation} from "../../library/general_interfaces";
import useSWR from "swr";
import Header from "../../components/tablet/header";
import {Container} from "@material-ui/core";
import {Availability} from "../../components/tablet/availability";

const avatarFake = require("../../img/avataricon.png");

export default function OfficeInformationId()  {

    const router = useRouter();
    const [currentOffice, setCurrentOffice] = useState<UserInformation>();

    // Will get the person by ID in the URL and revalidate every 10 seconds
    let {data, revalidate} = useSWR(() => '/api/user/' + router.query.officeId, fetcher, {
        refreshInterval: 10000
    });

    useEffect(() => {
        setCurrentOffice(data);
    }, [data, revalidate]);


    function getProfileImage() {
        if (currentOffice?.nameId) {
            try {
                const avatarReal = require("../../img/profile/" + currentOffice.nameId + ".jpg");
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "450px",
                    width: "450px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="450px"/>);
            }

        }
        return (<img src={avatarFake} alt={avatarFake} width="450px"/>);
    }

    async function fetcher(url: any) {
        if (router.query.officeId) {
            return fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(r => r.json());
        }
    }

    if (!data || !currentOffice) return (<div></div>);

    return (
        <Container>
            <div>
                <Header office={currentOffice?.office} nameId={currentOffice?.nameId} name={currentOffice?.name}
                        mail={currentOffice?.mail}/>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {getProfileImage()}
                    <h1 style={{
                        fontSize: "60px",
                        margin: "5px",
                        marginTop: "30px",
                        color: "#002546"
                    }}>{currentOffice.name}</h1>
                    <p style={{
                        fontSize: "30px",
                        margin: "5px",
                        marginBottom: "30px",
                        color: "#002546"
                    }}>{currentOffice?.title}</p>
                    <Availability nameId={currentOffice.nameId} status={currentOffice.status}
                                  calendarURL={currentOffice?.calendarURL}/>
                </div>

            </div>
        </Container>
    );
}

