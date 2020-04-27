import {Container} from "@material-ui/core";
import {CreateAccountForm} from "../components/createAccount/createAccountForm";


export default function CreateAccount() {



    return (
        <div>
            <Container style={{width: "25%"}}>
                <h1>Create Account</h1>
                <h3>Please enter account information</h3>
                <div>
                    <CreateAccountForm/>
                </div>
            </Container>
        </div>
    );
}