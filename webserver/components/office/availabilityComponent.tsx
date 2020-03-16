import React, {useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button} from "@material-ui/core";
import {stringify} from "querystring";


export const AvailabilityComponent: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<string>(props.status);

    function changeStatus() {
        status === "available" ? setStatus("busy") : setStatus("available");

        fetch('http://localhost:3000/api/setStatusById/' + "7913", {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(status)
        });
    }

    if (status === "available") {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={changeStatus}>
                    {status}
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={changeStatus}>
                {status}
            </Button>
        </div>
    );
};