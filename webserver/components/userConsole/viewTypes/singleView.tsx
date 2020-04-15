import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";


const cardStyles = makeStyles({
    root: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 700, height: 700},
    media: {width: 50, height: 50}
});

interface DoubleViewProps {
    firstView: ViewData;
}

export const SingleView = (props: DoubleViewProps) => {
    return (
        <div>
            <ImageView viewData={props.firstView} cardStyles={cardStyles}/>
        </div>
    );
};