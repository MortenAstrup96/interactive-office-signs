import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {DataType} from "../../library/enums";
import {ImageCard} from "../office/imageCard";
import {ViewData} from "../../library/general_interfaces";
import IconAdd from "../icons/iconAdd";

interface ImageViewProps {
    viewData: ViewData;
    cardStyles: any;
}

export const ImageView = (props: ImageViewProps) => {
    const classes = props.cardStyles();

    const [currentData] = useState<ViewData>({
        dataType: props.viewData.dataType,
        data: props.viewData.data
    });

    if (!currentData.dataType || currentData.dataType === DataType.EMPTY) {

        return (
            <Button variant="outlined" className={classes.rootIcon}>
                <IconAdd/>
            </Button>);
    }
    return (
        <div>
            <ImageCard src={currentData.data} dataType={currentData.dataType} cardStyles={props.cardStyles}/>
        </div>
    );
};