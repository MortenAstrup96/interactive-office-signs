import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button} from "@material-ui/core";
import {serverName} from "../../library/constants";


export const AvailabilityComponent: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState<string>(props.status);
    const [nameId] = useState<string>(props.nameId);

    // Updates database via API on status change
    useEffect(() => {
        fetch(serverName + '/api/setStatusById/' + props.nameId, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(Object.assign({nameId}, {status}))
        });
    }, [status, nameId]);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

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