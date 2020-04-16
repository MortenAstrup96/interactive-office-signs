import React from "react";
import {Grid} from "@material-ui/core";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {halfCardStyle} from "../../../styles/userConsoleStyles";


interface DoubleViewProps {
    firstView: ViewData;
    secondView: ViewData;
}

export const DoubleView = (props: DoubleViewProps) => {

    return (
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} cardStyles={halfCardStyle}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} cardStyles={halfCardStyle}/>
                </Grid>
            </Grid>
        </div>
    );
};