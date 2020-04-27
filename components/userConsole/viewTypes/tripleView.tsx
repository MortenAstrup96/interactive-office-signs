import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {Grid} from "@material-ui/core";
import {halfCardStyle, quarterCardStyle} from "../../../styles/userConsoleStyles";
import {ViewId} from "../../../library/enums";

interface TripleViewProps {
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    consoleMode: boolean;

    updateView?(viewId: ViewId, viewData: ViewData): void;
}

export const TripleView = (props: TripleViewProps) => {
    return (
        <div style={{width: "1000px"}}>
            <Grid container justify="center"
                  alignItems="center">
                <Grid item>
                    <ImageView viewData={props.firstView} viewId={ViewId.FIRST} cardStyles={quarterCardStyle}
                               consoleMode={props.consoleMode} updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.secondView} viewId={ViewId.SECOND} cardStyles={quarterCardStyle}
                               consoleMode={props.consoleMode} updateView={props.updateView}/>
                </Grid>
                <Grid item>
                    <ImageView viewData={props.thirdView} viewId={ViewId.THIRD} cardStyles={halfCardStyle}
                               consoleMode={props.consoleMode} updateView={props.updateView}/>
                </Grid>
            </Grid>
        </div>
    );
};