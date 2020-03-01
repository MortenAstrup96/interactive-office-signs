import React, {useState} from "react";
import {OfficeInformation} from "../components/office/officeInformation";
import OfficeInformationId from "./p/[officeId]";

const Office = () => {
    const [currentOffice, setCurrentOffice] = useState();

    return (
        <div>
            <OfficeInformationId/>
        </div>
    )
};

export default Office;