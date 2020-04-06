import {Container} from "@material-ui/core";
import {OfficeInformationProps} from "../library/general_interfaces";
import {CreateAccountForm} from "../components/createAccount/createAccountForm";
import {serverName} from "../library/constants";

export default function CreateAccount() {



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