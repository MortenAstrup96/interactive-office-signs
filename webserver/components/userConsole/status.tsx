import {Container, Button, TextField, colors, Popover, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {buttonStyle} from "../../styles/userConsoleStyles";
// @ts-ignore
import {TwitterPicker} from 'react-color'
import {CustomButton} from "./CustomButton";
import {getAvailableButton, getAwayButton, getBusyButton} from "../../library/general_functions";
import {theme} from "../../styles/generalStyles";

interface StatusInfo {
    statusButtons: any[];
    currentSelection: any;

    saveChanges(customStatus: any[], currentSelection: any): void;
}

export const Status = (props: StatusInfo) => {
    const buttonStyling = buttonStyle();
    const [addStatusTextField, setAddStatusTextField] = useState("");
    const [customStatus, setCustomStatus] = useState<any[]>((props.statusButtons ? props.statusButtons : [])); // TODO: Take values of props

    // Colorpicker
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [selectedColor, setSelectedColor] = useState(colors.green["500"]);
    const defaultColors = ["#8bad3f", "#fabb00", "#e2001a", "#37a0cb", "#00aba4", "#e2007a", "#655a9f", "#ee7f00", "#795548", "#ABB8C3"];
    const [currentSelection, setCurrentSelection] = useState(props.currentSelection);

    useEffect(() => {
        props.saveChanges(customStatus, currentSelection);
    }, [customStatus])

    function onButtonClick(buttonInfo: any) {
        setCurrentSelection(buttonInfo);
        props.saveChanges(customStatus, buttonInfo);
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
                <CustomButton text={status.text} color={status.color} position={i} removeSelf={removeButton}
                              selectButton={onButtonClick} key={i}/>
            );
            return customStatusList;
        }
    }

    return (
        <Container style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ThemeProvider theme={theme}>
            <h1 style={{fontFamily: "Roboto"}}>STATUS</h1>
            <div style={{display: "flex", flexDirection: "column", alignItems: "start", width: "220px"}}>
                <Button variant="contained" className={buttonStyling.buttonGreen}
                        onClick={() => onButtonClick(getAvailableButton())}>Available</Button>
                <Button variant="contained" className={buttonStyling.buttonYellow}
                        onClick={() => onButtonClick(getAwayButton())}>Away</Button>
                <Button variant="contained" className={buttonStyling.buttonRed}
                        onClick={() => onButtonClick(getBusyButton())}>Do not
                    disturb</Button>
                {getCustomStatus()}


                <div style={{display: "flex", alignItems: "center", marginTop: "20px"}}>
                    <TextField variant="outlined" label="Custom status"
                               style={{margin: "10px", width: "200px", height: "50px"}}
                               value={addStatusTextField}
                               onChange={(event: any) => setAddStatusTextField(event.target.value)}/>
                </div>

                <div style={{marginTop: "3px"}}>
                <Button color="primary" variant="contained" onClick={(e: any) => setAnchorEl(e.currentTarget)}
                        style={{width: "60px", height: "35px", marginLeft: "10px", marginRight: "71px"}}>Color</Button>

                    <Button color="primary" variant="contained" onClick={addCustomStatus}
                            style={{width: "60px", height: "35px"}}>Add</Button>
                </div>

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
            </ThemeProvider>
        </Container>
    );
}