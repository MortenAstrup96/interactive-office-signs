import React, {useEffect, useState} from "react";
import {OfficeAvailabilityProps} from "../../library/general_interfaces";
import {Box, Button, Card, CardContent, CardMedia, colors} from "@material-ui/core";
import {serverName} from "../../library/constants";
import {makeStyles} from '@material-ui/core/styles';
import Masonry from "react-masonry-component";
import {ViewType} from "../../library/enums";
import {VegaLite} from "react-vega/lib";


interface ImageInformation {
    src: string
    viewType: string
}

const useStyles = makeStyles({
    root: {margin: 5, maxWidth: 1600, maxHeight: 1000},
    media: {display: "block"}

});


export const ImageCard = (props: ImageInformation) => {
    const classes = useStyles();

    function getCustomView() {
        if (props.viewType === ViewType.VEGA) {
            return getVegaView();
        } else if (props.viewType === ViewType.IMAGE) {
            return (
                <Card className={classes.root}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={props.src}
                        title="Contemplative Reptile"
                    />
                </Card>
            )
        }
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(props.src);
            return (
                <Card variant="outlined" className={classes.root}>
                    <CardContent>
                        <VegaLite spec={parsedVega}/>
                    </CardContent>
                </Card>);
        } catch (e) {
        }
    }


    return (
        <div>
            {getCustomView()}
        </div>

    );
};