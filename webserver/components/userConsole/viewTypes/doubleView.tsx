import React, {useState} from "react";
import {Box, Button, Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";


const cardStyles = makeStyles({
    root: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 700, height: 350},
    media: { width: 50, height: 50}
});

interface DoubleViewProps {
    firstView: ViewData;
    secondView: ViewData;
}

export const DoubleView = (props: DoubleViewProps) => {

    return (
        <div>
            <ImageView viewData={props.firstView} cardStyles={cardStyles}/>
            <ImageView viewData={props.secondView} cardStyles={cardStyles}/>
        </div>
    );
};