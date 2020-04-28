import {Container, Button, TextField, colors, Popover} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {buttonStyle} from "../../styles/userConsoleStyles";
// @ts-ignore
import {TwitterPicker} from 'react-color'
import {CustomButton} from "./CustomButton";

interface StatusInfo {
    statusButtons: any[];

    saveChanges(customStatus: any[]): void;
}

export const Status = (props: StatusInfo) => {
    const buttonStyling = buttonStyle();
    const [addStatusTextField, setAddStatusTextField] = useState("");
    const [customStatus, setCustomStatus] = useState<any[]>((props.statusButtons ? props.statusButtons : [])); // TODO: Take values of props

    // Colorpicker
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [selectedColor, setSelectedColor] = useState(colors.green["500"]);
    const defaultColors = [colors.green["500"], colors.yellow.A700, colors.red.A700, "#0693E3", "#00D084", "#EB144C", "#9900EF", "#ff5722", "#795548", "#ABB8C3"]

    useEffect(() => {
        props.saveChanges(customStatus);
    }, [customStatus])

    function onButtonClick() {

    }

    function addCustomStatus() {
        const newStatus = {text: addStatusTextField, color: selectedColor};
        const newArray = [...customStatus, newStatus];

        setAddStatusTextField("");
        setCustomStatus(newArray);
    }

    function removeButton(position: number) {
        const arrayCopy = [...customStatus];
        console.log(position);

        if (position !== -1) {
            arrayCopy.splice(position, 1);
            setCustomStatus(arrayCopy);
        }
    }

    function getCustomStatus() {
        if (customStatus) {
            const customStatusList = customStatus.map((status: any, i: number) =>
                <CustomButton text={status.text} color={status.color} position={i} removeSelf={removeButton} key={i}/>
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
                <Button variant="contained" onClick={(e: any) => setAnchorEl(e.currentTarget)}
                        style={{backgroundColor: selectedColor, color: "#ffffff", marginLeft: "10px"}}>Color</Button>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <TwitterPicker color={selectedColor} colors={defaultColors}
                                   onChange={(color: any) => setSelectedColor(color.hex)}/>
                </Popover>
            </div>


        </Container>
    );
}