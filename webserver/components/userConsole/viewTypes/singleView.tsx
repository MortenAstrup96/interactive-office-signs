import React from "react";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";
import {singleCardStyle} from "../../../styles/userConsoleStyles";




interface DoubleViewProps {
    firstView: ViewData;
}

export const SingleView = (props: DoubleViewProps) => {
    return (
        <div>
            <ImageView viewData={props.firstView} cardStyles={singleCardStyle}/>
        </div>
    );
};