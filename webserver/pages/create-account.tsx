import {Container, CssBaseline, ThemeProvider} from "@material-ui/core";
import {CreateAccountForm} from "../components/createAccount/createAccountForm";
import {theme} from "../styles/generalStyles";


export default function CreateAccount() {


    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <Container style={{width: "50%"}}>
                <h1 style={{textAlign: "center"}}>CREATE ACCOUNT</h1>
                <h3 style={{textAlign: "center"}}>Please enter account information</h3>
                <div>
                    <CreateAccountForm/>
                </div>
            </Container>
            </ThemeProvider>
        </div>
    );
}