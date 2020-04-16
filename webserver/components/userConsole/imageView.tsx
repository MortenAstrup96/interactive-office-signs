import React, {useState} from "react";
import {Button, createStyles, Modal, Theme} from "@material-ui/core";
import {DataType} from "../../library/enums";
import {ImageCard} from "../tablet/imageCard";
import {ViewData} from "../../library/general_interfaces";
import IconAdd from "../../img/icons/iconAdd";
import {makeStyles} from "@material-ui/styles";
import {modalPopupStyles} from "../../styles/userConsoleStyles";

interface ImageViewProps {
    viewData: ViewData;
    cardStyles: any;
}


export const ImageView = (props: ImageViewProps) => {
    const classes = props.cardStyles();
    const modalClasses = modalPopupStyles();

    const [showModal, setShowModal] = useState(false);

    const [currentData] = useState<ViewData>({
        dataType: props.viewData.dataType,
        data: props.viewData.data
    });

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
                        <h2>Please Specify</h2>
                        <p>Things can be changed here</p>
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