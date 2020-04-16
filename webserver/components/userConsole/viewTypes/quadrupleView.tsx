import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Grid} from "@material-ui/core";
import {quarterCardStyle} from "../../../styles/userConsoleStyles";
import {ViewId} from "../../../library/enums";


interface QuadrupleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;

    updateView(viewId: ViewId): void;
}

export const QuadrupleView = (props: QuadrupleViewProps) => {
    return (
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} viewId={ViewId.FIRST} cardStyles={quarterCardStyle}
                               updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} viewId={ViewId.SECOND} cardStyles={quarterCardStyle}
                               updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.thirdView} viewId={ViewId.THIRD} cardStyles={quarterCardStyle}
                               updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.fourthView} viewId={ViewId.FOURTH} cardStyles={quarterCardStyle}
                               updateView={props.updateView}/>
                </Grid>
            </Grid>
        </div>

    );
};