import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Box} from "@material-ui/core";


const bigCardStyle = makeStyles({
    root: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 350, height: 700},
    media: {width: 50, height: 50}
});

const smallCardStyle = makeStyles({
    root: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 350, height: 340},
    media: {width: 50, height: 50}
});

interface TripleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
}

export const TripleView = (props: TripleViewProps) => {
    return (
        <Box display="flex">
            <ImageView viewData={props.firstView} cardStyles={bigCardStyle}/>
            <ImageView viewData={props.secondView} cardStyles={smallCardStyle}/>
            <ImageView viewData={props.thirdView} cardStyles={smallCardStyle}/>
        </Box>
    );
};