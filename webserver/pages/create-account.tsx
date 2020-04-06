import {Button, Container, Grid, List, ListItem, ListItemText,} from "@material-ui/core";
import useSWR from "swr";
import Link from "next/link";
import {OfficeInformationProps} from "../library/general_interfaces";
import {Form} from "../components/index/form";
import {serverName} from "../library/constants";

interface NameProp {
    name: string,
    nameId: string
}

export default function CreateAccount() {

    const addUserToDB = (prop: OfficeInformationProps) => {
        fetch(serverName + '/api/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prop)
        });
    };

    return (
        <div>
            <Container style={{width: "25%"}}>
                <h1>Create Account</h1>
                <h3>Please enter account information</h3>
                <div>
                    <Form addUser={addUserToDB}/>
                </div>

                <div>
                    <Link href={"/tablets/"}>
                        <Button variant="contained" color="primary" style={{width: 250, height: 45, marginTop: "20px"}}>Tablet
                            Overview</Button>
                    </Link>
                </div>


            </Container>
        </div>
    );
}