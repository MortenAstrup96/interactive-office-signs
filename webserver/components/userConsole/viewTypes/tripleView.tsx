import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Grid} from "@material-ui/core";
import {halfCardStyle, quarterCardStyle} from "../../../styles/userConsoleStyles";

interface TripleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
}

export const TripleView = (props: TripleViewProps) => {
    return (
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} cardStyles={quarterCardStyle}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} cardStyles={quarterCardStyle}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.thirdView} cardStyles={halfCardStyle}/>
                </Grid>
            </Grid>
        </div>
    );
};