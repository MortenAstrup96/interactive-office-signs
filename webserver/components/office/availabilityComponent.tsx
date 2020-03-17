import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button} from "@material-ui/core";


export const AvailabilityComponent: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<string>(props.status);
    const [nameId] = useState<string>(props.nameId);

    // Updates database via API on status change
    useEffect(() => {
        fetch('http://localhost:3000/api/setStatusById/' + props.nameId, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(Object.assign({nameId}, {status}))
        });
    }, [status, nameId]);

    function changeStatus() {
        status === "available" ? setStatus("busy") : setStatus("available");
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