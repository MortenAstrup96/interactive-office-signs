import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Grid} from "@material-ui/core";
import {quarterCardStyle} from "../../../styles/userConsoleStyles";


interface QuadrupleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;
}

export const QuadrupleView = (props: QuadrupleViewProps) => {
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
                    <ImageView viewData={props.thirdView} cardStyles={quarterCardStyle}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.fourthView} cardStyles={quarterCardStyle}/>
                </Grid>
            </Grid>
        </div>

    );
};