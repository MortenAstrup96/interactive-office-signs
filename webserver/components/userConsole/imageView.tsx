import React, {useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Input,
    Modal, TextField,
    Typography
} from "@material-ui/core";
import {DataType, ViewId} from "../../library/enums";
import {ImageCard} from "../tablet/imageCard";
import {ViewData} from "../../library/general_interfaces";
import IconAdd from "../../img/icons/iconAdd";
import {modalPopupStyles} from "../../styles/userConsoleStyles";
import {any} from "prop-types";

interface ImageViewProps {
    viewData: ViewData;
    viewId: ViewId;
    cardStyles: any;

    updateView(viewId: ViewId, viewData: ViewData): void;
}


export const ImageView = (props: ImageViewProps) => {
    const classes = props.cardStyles();
    const modalClasses = modalPopupStyles();
    const [showModal, setShowModal] = useState(false);

    // TODO: Maybe remove this?
    const [currentData, setCurrentData] = useState<ViewData>({
        dataType: props.viewData.dataType,
        data: props.viewData.data
    });

    function saveChanges(dataType: DataType, data: any) {
        const newData = {
            dataType: DataType.IMAGE,
            data: "https://images.pexels.com/photos/9198/nature-sky-twilight-grass-9198.jpg?cs=srgb&dl=nature-sky-clouds-field-9198.jpg&fm=jpg"
        };

        props.updateView(props.viewId, newData);
        setCurrentData(newData);    // Required to force an update of component
    }

    if (!currentData.dataType || currentData.dataType === DataType.EMPTY) {
        return (
            <div>
                <Button variant="outlined" className={classes.rootIcon} onClick={() => setShowModal(true)}>
                    <IconAdd/>
                </Button>
                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    className={modalClasses.window}
                >
                    <div className={modalClasses.paper}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Add Content
                                </Typography>
                                <div>
                                    <TextField label="Image Link" variant="outlined"/>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small" color="primary" onClick={saveChanges}>
                                    Choose
                                </Button>
                                <Button size="small" color="primary">
                                    Cancel
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                </Modal>
            </div>);

    }
    return (
        <div>
            <ImageCard src={currentData.data} dataType={currentData.dataType} cardStyles={props.cardStyles}/>
        </div>
    );
};