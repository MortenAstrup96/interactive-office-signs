import React from "react";
import {Card, CardContent, CardHeader, CardMedia, IconButton} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {DataType} from "../../library/enums";
import {VegaLite} from "react-vega/lib";
import IconMail from "../../img/icons/iconMail";


interface ImageInformation {
    src: string;
    dataType: string;
    cardStyles: any;
    consoleView?: boolean;
}

const imageStyles = makeStyles({
    root: {margin: 10},
    media: {minWidth: "100%", minHeight: "100%"}
});
const vegaStyles = makeStyles({
    root: {margin: 5, maxWidth: 600, maxHeight: 600},
    media: {maxWidth: "100%", maxHeight: "100%"}
});


export const ImageCard = (props: ImageInformation) => {
    const cardClasses = props.cardStyles();
    const imgClasses = imageStyles();
    const vegaClasses = vegaStyles();


    function getCustomView() {
        if (props.dataType === DataType.VEGA) {
            return getVegaView();
        } else if (props.dataType === DataType.IMAGE) {
            return (
                <div>
                    <Card variant="outlined" className={cardClasses.root}>
                        <CardMedia
                            component="img"
                            className={imgClasses.media}
                            image={props.src}
                        />
                    </Card>
                </div>
            )
        }
        return (
            <div className={cardClasses.root}>

            </div>)
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