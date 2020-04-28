import {Container, Button, TextField, colors} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {buttonStyle} from "../../styles/userConsoleStyles";


export const Status = (props: any) => {
    const buttonStyling = buttonStyle();
    const [addStatusTextField, setAddStatusTextField] = useState("");
    const [customStatus, setCustomStatus] = useState<any[]>([]) // TODO: Take values of props

    function onButtonClick() {

    }

    function addCustomStatus() {
        const newStatus = {text: addStatusTextField, color: colors.green["500"]};
        const newArray = [...customStatus, newStatus];

        setAddStatusTextField("");
        setCustomStatus(newArray);
    }

    function getCustomStatus() {
        if (customStatus) {
            const customStatusList = customStatus.map((status: any) =>
                <Button variant="contained" style={{
                    backgroundColor: status.color,
                    color: "#ffffff",
                    width: "200px",
                    height: "50px",
                    margin: "10px"
                }}>{status.text}</Button>
            );
            return customStatusList;
        }

    }

    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Status</h2>
            <div style={{display: "flex", flexDirection: "column", alignItems: "start", width: "220px"}}>
                <Button variant="contained" className={buttonStyling.buttonGreen}
                        onClick={onButtonClick}>Available</Button>
                <Button variant="contained" className={buttonStyling.buttonYellow} onClick={onButtonClick}>Away</Button>
                <Button variant="contained" className={buttonStyling.buttonRed} onClick={onButtonClick}>Do not
                    disturb</Button>
                {getCustomStatus()}

                <div style={{display: "flex", alignItems: "center"}}>
                    <TextField variant="outlined" label="Custom status"
                               style={{margin: "10px", width: "200px", height: "50px"}}
                               value={addStatusTextField}
                               onChange={(event: any) => setAddStatusTextField(event.target.value)}/>
                    <Button color="primary" variant="contained" onClick={addCustomStatus}
                            style={{width: "60px", height: "35px"}}>Add</Button>
                </div>
            </div>


        </Container>
    );
}