import React, {useState} from "react";
import {useRouter} from "next/router";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Button} from "@material-ui/core";
import color from "@material-ui/core/colors";


export const AvailabilityComponent: React.FC<OfficeAvailabilityProps> = props => {
    const [status, setStatus] = useState(props.status);

    function changeStatus() {
        status === "available" ? setStatus("busy") : setStatus("available");
    }

    if(status === "available") {
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