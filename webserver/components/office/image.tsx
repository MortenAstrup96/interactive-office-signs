import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Box, Button, Card, CardContent, CardMedia, colors} from "@material-ui/core";
import {serverName} from "../../library/constants";
import {makeStyles} from '@material-ui/core/styles';

interface ImageInformation {
    src: string
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const Image = (props: ImageInformation) => {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardMedia
                src={props.src}
                title="Contemplative Reptile"
            />
        </Card>);
};