import React from "react";
import {ViewData} from "../../../library/general_interfaces";


interface CustomViewProps {
    customView: ViewData;
}

export const CustomView = (props: CustomViewProps) => {
    return (
        <div>
            <h1>This is a custom view</h1>
            <h4>You can put a lot of text here</h4>
        </div>
    );
};