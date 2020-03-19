import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button, Color, colors, withStyles} from "@material-ui/core";
import {serverName} from "../../library/constants";
import {green} from "@material-ui/core/colors";


export const AvailabilityComponent: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<string>(props.status);
    const [buttonColor, setButtonColor] = useState<any>({background: colors.green["500"], text: colors.common.black});
    const [nameId] = useState<string>(props.nameId);


    // Updates database via API on status change
    useEffect(() => {
        fetch(serverName + '/api/setStatusById/' + props.nameId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.assign({nameId}, {status}))
        });
    }, [status, nameId]);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    useEffect(() => {
        switch (status) {
            case "Available":
                setButtonColor({background: colors.green["500"], text: colors.common.white});
                break;
            case "Busy":
                setButtonColor({background: colors.red.A700, text: colors.common.white});
                break;
            default:
                setButtonColor({background: colors.yellow.A700, text: colors.common.black});
        }
    }, [status]);


    // Will switch between available/busy - If neither switch to available
    function changeStatus() {
        status === "Available" ? setStatus("Busy") : setStatus("Available");
    }

    return (
        <div>
            <Button variant="contained" onClick={changeStatus}
                    style={{backgroundColor: buttonColor.background, color: buttonColor.text}}>
                {status}
            </Button>
        </div>
    );
};