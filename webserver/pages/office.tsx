import React, {useState} from "react";
import {OfficeInformation} from "../components/office/officeInformation";
import OfficeInformationId from "./office/[officeId]";
import {Container} from "@material-ui/core";

const Office = () => {
    const [currentOffice, setCurrentOffice] = useState();

    return (
        <div>
            <Container color="#123">
                <OfficeInformationId/>
            </Container>
        </div>
    )
};

export default Office;