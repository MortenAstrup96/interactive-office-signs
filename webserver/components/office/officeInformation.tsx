import React from "react";
import {useRouter} from "next/router";
import {OfficeInformationProps} from "../../library/general_interfaces";


export const OfficeInformation: React.FC<OfficeInformationProps> = props => {
    const router = useRouter()

    return (
        <div>
            <h1>{router.query.office}</h1>
        </div>
    );
}