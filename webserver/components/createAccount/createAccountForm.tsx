import React, {useReducer, useState} from "react";
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
import {generateLogEvent, getAvailableButton} from "../../library/general_functions";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "auto"
};

export const CreateAccountForm = () => {
    const router = useRouter();


    const addUser = (prop: { mail: string; calendarURL: string; fourthView: { data: string; dataType: string }; customView: { data: string; dataType: string }; thirdView: { data: string; dataType: string }; office: string; name: string; title: string; viewType: string; nameId: string; firstView: { data: string; dataType: string }; secondView: { data: string; dataType: string }; status: { text: string, color: string } }) => {
        const username = prop.nameId;

        fetch('/api/user/0', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prop)
        }).then(() => router.replace("/user/" + username));
    };

    const [name, setName] = useState("");
    const [nameId, setNameId] = useState("");
    const [office, setOffice] = useState("");
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [pin, setPin] = useState("");
    const [calendarURL, setCalenderURL] = useState("");
    const [log, forceUpdate] = useReducer(x => x + 1, 0);
    const handleSubmit = () => {
        const user = {
            office: office,
            nameId: nameId,
            name: name,
            title: title,
            mail: mail,
            status: getAvailableButton(),
            calendarURL: calendarURL,
            viewType: "",
            firstView: {dataType: "", data: ""},
            secondView: {dataType: "", data: ""},
            thirdView: {dataType: "", data: ""},
            fourthView: {dataType: "", data: ""},
            customView: {dataType: "", data: ""}
        };
        generateLogEvent(user.nameId, {eventType: "New User", userInfo: user});
        addUser(user);
        setName("");
        setNameId("");
        setOffice("");
        setTitle("");
        setMail("");
        setPin("");
        setCalenderURL("");
    };
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Account Information', 'Customization & Settings', 'Confirmation'];

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
                return <div>{getCustomizationInformation()}</div>;
            case 2:
                return <div>{getResultInformation()}</div>;
            default:
                return <p>Error Loading</p>;
        }
    }

    function getProfile() {

        try {
            const avatarReal = require("../../static/" + nameId + ".jpg");

            return (<img style={{
                objectFit: "cover",
                borderRadius: "50%",
                height: "150px",
                width: "150px"
            }} src={avatarReal}/>)
        } catch (e) {
        }
    }

    function getResultInformation() {
        return (<div style={{display: "flex"}}>
            {getProfile()}
            <Card variant="outlined" style={{width: "350px", margin: "20px"}}>
                <CardContent>
                    {getSpan("Name", name)}
                    {getSpan("Office", office)}
                    {getSpan("Title", title)}
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

                    <TextField type="text" value={title} required onChange={(e) => setTitle(e.target.value)}
                               variant="outlined" label="Title" style={{margin: "10px"}}/>

                    <TextField type="text" value={mail} required onChange={(e) => setMail(e.target.value)}
                               variant="outlined"
                               label="Mail" style={{margin: "10px", marginBottom: "40px"}}/>
                </ThemeProvider>
            </div>
        );
    }

    const postProfileImage = async (e: any) => {
        const file = e.currentTarget.files[0];
        await fetch("/api/uploadImageById/" + nameId, {
            method: "POST",
            headers: {
                "Content-Type": file.type
            },
            body: file
        }).then(() => forceUpdate());
    };

    function getProfileThing() {
        try {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "20px",
                }}>
                    <img style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        height: "150px",
                        width: "150px",
                        backgroundImage: "url('../../static/avataricon.png')",
                        backgroundSize: "100%"
                    }} src={`${"../../static/" + nameId + ".jpg"}?${new Date().getTime()}`}/>
                    <Button variant="contained" component="label" style={{marginTop: "10px"}}>Change Picture
                        <input
                            type="file"
                            onChange={postProfileImage}
                            style={{display: "none"}}/>
                    </Button>
                </div>
            );
        } catch (e) {
            console.log(e);
        }
    }

    function getCustomizationInformation() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {getProfileThing()}

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
                <CssBaseline/>
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
