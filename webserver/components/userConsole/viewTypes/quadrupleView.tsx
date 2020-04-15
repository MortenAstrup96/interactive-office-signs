import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Box} from "@material-ui/core";


const cardStyles = makeStyles({
    root: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 350, height: 350},
    media: {width: 50, height: 50}
});

interface QuadrupleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;
}

export const QuadrupleView = (props: QuadrupleViewProps) => {
    return (
        <Box display="flex">
            <ImageView viewData={props.firstView} cardStyles={cardStyles}/>
            <ImageView viewData={props.secondView} cardStyles={cardStyles}/>
            <ImageView viewData={props.thirdView} cardStyles={cardStyles}/>
            <ImageView viewData={props.fourthView} cardStyles={cardStyles}/>
        </Box>
    );
};