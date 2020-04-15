import React, {useState} from "react";
import {Box, Button, Card} from "@material-ui/core";
import {DataType, ViewType} from "../../library/enums";
import {ImageCard} from "../office/imageCard";
import {UserInformation, ViewData} from "../../library/general_interfaces";
import {makeStyles} from "@material-ui/core/styles";

const cardStyles = makeStyles({
    root: {margin: 10, width: 600, height: 600}
});

interface ImageViewProps {
    currentUser: UserInformation;
}

export const ImageView = (props: ImageViewProps) => {
    const classes = cardStyles();
    const [currentData, setCurrentData] = useState<ViewData>({
        dataType: props.currentUser.firstView.dataType,
        data: props.currentUser.firstView.data
    });

    if (!currentData.dataType || currentData.dataType === DataType.EMPTY) {
        return <Card variant="outlined" className={classes.root}/>
    }
    return (
        <Box>
            <Button>
                <ImageCard src={currentData.data} dataType={currentData.dataType}/>
            </Button>
        </Box>
    );
};