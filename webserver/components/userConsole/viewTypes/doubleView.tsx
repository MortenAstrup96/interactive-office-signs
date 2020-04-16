import React from "react";
import {Grid} from "@material-ui/core";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {halfCardStyle} from "../../../styles/userConsoleStyles";
import {ViewId} from "../../../library/enums";


interface DoubleViewProps {
    firstView: ViewData;
    secondView: ViewData;

    updateView(viewId: ViewId): void;
}

export const DoubleView = (props: DoubleViewProps) => {

    return (
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} viewId={ViewId.FIRST} cardStyles={halfCardStyle}
                               updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} viewId={ViewId.SECOND} cardStyles={halfCardStyle}
                               updateView={props.updateView}/>
                </Grid>
            </Grid>
        </div>
    );
};