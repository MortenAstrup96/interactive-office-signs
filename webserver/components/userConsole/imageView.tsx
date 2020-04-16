import React, {useState} from "react";
import {Button, Modal} from "@material-ui/core";
import {DataType, ViewId} from "../../library/enums";
import {ImageCard} from "../tablet/imageCard";
import {ViewData} from "../../library/general_interfaces";
import IconAdd from "../../img/icons/iconAdd";
import {modalPopupStyles} from "../../styles/userConsoleStyles";

interface ImageViewProps {
    viewData: ViewData;
    viewId: ViewId;
    cardStyles: any;
    updateView(viewId: ViewId): void;
}


export const ImageView = (props: ImageViewProps) => {
    const classes = props.cardStyles();
    const modalClasses = modalPopupStyles();

    const [showModal, setShowModal] = useState(false);

    // TODO: Maybe remove this?
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
                        <Button color="primary" variant="contained" onClick={() => props.updateView(props.viewId)}>
                            SAVE
                        </Button>
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