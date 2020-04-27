import React, {useState} from "react";
import { Button, Step, StepLabel, Stepper, TextField} from "@material-ui/core";
import {useRouter} from "next/router";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "auto"
};

export const CreateAccountForm = () => {
    const router = useRouter();


    const addUser = (prop: { mail: string; calendarURL: string; bottomView: { data: string; viewType: string }; fourthView: { data: string; dataType: string }; customView: { data: string; dataType: string }; thirdView: { data: string; dataType: string }; officeId: string; topView: { data: string; viewType: string }; name: string; viewType: string; nameId: string; firstView: { data: string; dataType: string }; secondView: { data: string; dataType: string }; status: string }) => {
        const username = prop.nameId;
        fetch('/api/addUser', {
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
            topView: {viewType: "", data: ""},
            bottomView: {viewType: "", data: ""},
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
                return <p>3</p>;
            default:
                return <p>Error Loading</p>;
        }
    }

    function getAccountInformation() {
        return (<div style={gridStyle}>
                <h4 style={{margin: 0}}>Account Information</h4>
                <TextField type="text" value={nameId} required onChange={(e) => setNameId(e.target.value)}
                           variant="outlined" label="Username" style={{margin: "10px"}}/>

                <TextField type="text" value={pin} required onChange={(e) => setPin(e.target.value)}
                           variant="outlined" label="PIN Code"
                           style={{margin: "10px", marginBottom: "60px", width: "200px"}}/>

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
            </div>
        );
    }

    function getCustomizationInformation() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "baseline", margin: "20px"}}>
                    <img style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        height: "150px",
                        width: "150px"
                    }} src={avatarFake} alt={avatarFake}/>
                    <Button variant="contained" component="label">Change Picture</Button>
                </div>

                <h4 style={{marginTop: "50px", marginBottom: 0}}>Automatic Availability</h4>
                <p style={{marginBottom: 0}}>Connect your calendar to automatically change status</p>
                <TextField type="text" value={calendarURL}
                           onChange={(e) => setCalenderURL(e.target.value)}
                           variant="outlined"
                           label="Calendar .ics URL"
                           style={{margin: "10px", marginBottom: "50px", width: "600px", alignSelf: "center"}}/>
            </div>
        );
    }

    function getNextButton() {
        if (activeStep === steps.length - 1) {
            return (<Button variant="contained" color="primary" size="medium" onClick={handleSubmit}>Create
                Account</Button>);
        } else {

            return (<Button variant="contained" color="primary" onClick={handleNext}
                            style={{margin: "10px"}}
                            disabled={(nameId === "" || pin === "" || name === "" || office === "" || mail === "")}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>);
        }
    }

    return (
        <div>
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
        </div>
    );
};
