import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ImageView} from "../imageView";
import {ViewData} from "../../../library/general_interfaces";


interface CustomViewProps {
    customView: ViewData;
}

export const CustomView = (props: CustomViewProps) => {
    console.log(props);
    return (
        <div>
            <h1>This is a custom view</h1>
            <h4>You can put a lot of text here</h4>
        </div>
    );
};