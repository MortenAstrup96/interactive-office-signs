import React, {useState} from "react";
import {Box, Button, Card, CardContent, CardMedia} from "@material-ui/core";
import {DataType, ViewType} from "../../library/enums";
import {ImageCard} from "../office/imageCard";
import {UserInformation, ViewData} from "../../library/general_interfaces";
import {makeStyles} from "@material-ui/core/styles";
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
            <Button variant="outlined" className={classes.root}>
                <IconAdd/>
            </Button>);
    }
    return (
        <div>
            <Button>
                <ImageCard src={currentData.data} dataType={currentData.dataType}/>
            </Button>
        </div>
    );
};