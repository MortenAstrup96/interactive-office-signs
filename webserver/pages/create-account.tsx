import {Container, List, ListItem, ListItemText,} from "@material-ui/core";
import useSWR from "swr";
import Link from "next/link";
import {OfficeInformationProps} from "../library/general_interfaces";
import {CreateAccountForm} from "../components/create-account/createAccountForm";
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
                    <CreateAccountForm addUser={addUserToDB}/>
                </div>

            </Container>
        </div>
    );
}