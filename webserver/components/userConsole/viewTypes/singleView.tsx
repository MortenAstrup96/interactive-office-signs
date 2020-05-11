import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {singleCardStyle} from "../../../styles/userConsoleStyles";
import {ViewId} from "../../../library/enums";


interface DoubleViewProps {
    firstView: ViewData;
    consoleMode: boolean;
    nameId: string;

    updateView?(viewId: ViewId, viewData: ViewData): void;
}

export const SingleView = (props: DoubleViewProps) => {
    return (
        <div>
            <ImageView viewData={props.firstView} viewId={ViewId.FIRST} cardStyles={singleCardStyle}
                       consoleMode={props.consoleMode} nameId={props.nameId} updateView={props.updateView}/>
        </div>
    );
};