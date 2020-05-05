import React, {useState} from "react";
import {
    Button,
    Card,
    CardContent, CssBaseline,
    Divider,
    Step,
    StepLabel,
    Stepper,
    TextField,
    ThemeProvider
} from "@material-ui/core";
import {useRouter} from "next/router";
import {theme} from "../../styles/generalStyles";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "auto"
};

export const CreateAccountForm = () => {
    const router = useRouter();


    const addUser = (prop: { mail: string; calendarURL: string; fourthView: { data: string; dataType: string }; customView: { data: string; dataType: string }; thirdView: { data: string; dataType: string }; officeId: string; name: string; viewType: string; nameId: string; firstView: { data: string; dataType: string }; secondView: { data: string; dataType: string }; status: string }) => {
        const username = prop.nameId;
        const avatarFake = require("../../img/avataricon.png");

        fetch('/api/user/0', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prop)
        }).then(() => router.replace("/user/" + username));
    };

    const [name, setName] = useState("");
    const [nameId, setNameId] = useState("");
    const [office, setOffice] = useState("");
    const [mail, setMail] = useState("");
    const [pin, setPin] = useState("");
    const [calendarURL, setCalenderURL] = useState("");
    const handleSubmit = () => {
        addUser({
            officeId: office,
            nameId: nameId,
            name: name,
            mail: mail,
            status: "Available",
            calendarURL: calendarURL,
            viewType: "",
            firstView: {dataType: "", data: ""},
            secondView: {dataType: "", data: ""},
            thirdView: {dataType: "", data: ""},
            fourthView: {dataType: "", data: ""},
            customView: {dataType: "", data: ""}
        });
        setName("");
        setNameId("");
        setOffice("");
        setMail("");
        setPin("")
        setCalenderURL("")
    };
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Account Information', 'Customization & Settings', 'Confirmation'];
    const avatarFake = require("../../img/avataricon.png");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    function getStepForm(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <div>{getAccountInformation()}</div>;
            case 1:
                return <div>{getCustomizationInformation()}</div>
            case 2:
                return <div>{getResultInformation()}</div>;
            default:
                return <p>Error Loading</p>;
        }
    }

    function getProfile() {
        try {
            const avatarReal = require("../../img/profile/" + nameId + ".jpg");
            return (<img style={{
                objectFit: "cover",
                borderRadius: "50%",
                height: "150px",
                width: "150px"
            }} src={avatarReal} alt={avatarFake}/>)
        } catch (e) {
            return (<img style={{
                objectFit: "cover",
                borderRadius: "50%",
                height: "200px",
                width: "200px",
                alignSelf: "center"
            }} src={avatarFake} alt={avatarFake}/>);
        }
    }

    function getResultInformation() {
        return (<div style={{display: "flex"}}>
            {getProfile()}
            <Card variant="outlined" style={{width: "350px", margin: "20px"}}>
                <CardContent>
                    {getSpan("Name", name)}
                    {getSpan("Office", office)}
                    {getSpan("email", mail)}
                    <Divider style={{margin: "10px"}}/>
                    {getSpan("Username", nameId)}
                    {getSpan("Calendar URL", calendarURL)}
                </CardContent>
            </Card>

        </div>)
    }

    function getSpan(title: string, value: string) {
        return <span style={{display: "flex", justifyContent: "start", alignItems: "center"}}>
            <h4 style={{margin: "8px", marginRight: "20px"}}>{title}: </h4><p
            style={{margin: "8px"}}>{value}</p></span>
    }

    function getAccountInformation() {
        return (<div style={gridStyle}>
                <ThemeProvider theme={theme}>
                <h4 style={{margin: 0, marginTop: "20px"}}>Account Information</h4>
                <TextField type="text" value={nameId} required onChange={(e) => setNameId(e.target.value)}
                           variant="outlined" label="Username" style={{margin: "10px"}}/>

                <TextField type="text" value={pin} required onChange={(e) => setPin(e.target.value)}
                           variant="outlined" label="PIN Code"
                           style={{margin: "10px", marginBottom: "40px", width: "200px"}}/>

                <h4 style={{margin: 0, marginTop: "10px"}}>Office Information</h4>
                <TextField type="text" value={name} required onChange={(e) => setName(e.target.value)}
                           variant="outlined"
                           label="Full Name"
                           style={{margin: "10px", width: "400px"}}/>
                <TextField type="text" value={office} required onChange={(e) => setOffice(e.target.value)}
                           variant="outlined" label="Office" style={{margin: "10px"}}/>

                <TextField type="text" value={mail} required onChange={(e) => setMail(e.target.value)}
                           variant="outlined"
                           label="Mail" style={{margin: "10px", marginBottom: "40px"}}/>
                </ThemeProvider>
            </div>
        );
    }

    function getCustomizationInformation() {
        return (
            <ThemeProvider theme={theme}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "20px"}}>
                    <img style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        height: "150px",
                        width: "150px"
                    }} src={avatarFake} alt={avatarFake}/>
                    <Button variant="contained" component="label" style={{marginTop: "10px"}}>Change Picture</Button>
                </div>

                <h4 style={{marginTop: "30px", marginBottom: 0}}>Automatic Availability</h4>
                <p style={{marginBottom: 10}}>Connect your calendar to automatically change status</p>
                <TextField type="text" value={calendarURL}
                           onChange={(e) => setCalenderURL(e.target.value)}
                           variant="outlined"
                           label="Calendar .ics URL"
                           style={{margin: 0, marginBottom: "50px", width: "600px"}}/>
            </div>
            </ThemeProvider>
        );
    }

    function getNextButton() {
        if (activeStep === steps.length - 1) {
            return (
                <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" style={{margin: "10px"}} onClick={handleSubmit}>Create
                Account</Button>
                </ThemeProvider>);
        } else {

            return (<ThemeProvider theme={theme}><Button variant="contained" color="primary" onClick={handleNext}
                            style={{margin: "10px"}}
                            disabled={(nameId === "" || pin === "" || name === "" || office === "" || mail === "")}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button></ThemeProvider>);
        }
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div style={{display: "flex", justifyContent: "center"}}>
                <form onSubmit={handleSubmit}>
                    {getStepForm(activeStep)}
                </form>
            </div>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <p>All steps completed</p>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            style={{margin: "10px"}}
                        >
                            Back
                        </Button>
                        {getNextButton()}
                    </div>
                )}
            </div>
            </ThemeProvider>
        </div>
    );
};
