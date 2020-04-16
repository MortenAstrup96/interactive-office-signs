import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Grid} from "@material-ui/core";


const cardStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: 10,
        width: 340,
        height: 340
    },
    rootIcon: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 340, height: 340},
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
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} cardStyles={cardStyles}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} cardStyles={cardStyles}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.thirdView} cardStyles={cardStyles}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.fourthView} cardStyles={cardStyles}/>
                </Grid>
            </Grid>
        </div>

    );
};