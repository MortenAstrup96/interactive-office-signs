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

const imageStyles = makeStyles({
    root: {margin: 5, maxWidth: 400, maxHeight: 400},
    media: {maxWidth: "100%", maxHeight: "100%"}
});
const vegaStyles = makeStyles({
    root: {margin: 5, maxWidth: 600, maxHeight: 600},
    media: {maxWidth: "100%", maxHeight: "100%"}
});


export const ImageCard = (props: ImageInformation) => {
    const imgClasses = imageStyles();
    const vegaClasses = vegaStyles();

    function getCustomView() {
        if (props.viewType === ViewType.VEGA) {
            return getVegaView();
        } else if (props.viewType === ViewType.IMAGE) {
            return (
                <div>
                    <Card variant="outlined" className={imgClasses.root}>
                        <CardMedia
                            component="img"
                            className={imgClasses.media}
                            image={props.src}
                            title="Contemplative Reptile"
                        />
                    </Card>
                </div>

            )
        }
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(props.src);
            return (
                <div>
                    <Card variant="outlined" className={vegaClasses.root}>
                        <CardContent className={vegaClasses.media}>
                            <VegaLite spec={parsedVega}/>
                        </CardContent>
                    </Card>
                </div>
            );
        } catch (e) {
        }
    }


    return (
        <div>
            {getCustomView()}
        </div>

    );
};