import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Modal,
    Radio,
    RadioGroup, TextareaAutosize,
    TextField,
    Typography
} from "@material-ui/core";
import {DataType, ViewId} from "../../library/enums";
import {ImageCard} from "../tablet/imageCard";
import {ViewData} from "../../library/general_interfaces";
import IconAdd from "../../img/icons/iconAdd";
import {modalPopupStyles} from "../../styles/userConsoleStyles";
import {VegaLite} from "react-vega/lib";

interface ImageViewProps {
    viewData: ViewData;
    viewId: ViewId;
    cardStyles: any;
    consoleMode: boolean;

    updateView?(viewId: ViewId, viewData: ViewData): void;
}


export const ImageView = (props: ImageViewProps) => {
    const classes = props.cardStyles();
    const modalClasses = modalPopupStyles();
    const [showModal, setShowModal] = useState(false);
    const [currentData, setCurrentData] = useState<ViewData>({
        dataType: props.viewData?.dataType,
        data: props.viewData?.data
    });
    const [selectedRadio, setSelectedRadio] = useState<string>(DataType.EMPTY);
    const [selectedData, setSelectedData] = useState("");

    function saveChanges() {
        const newData = {
            dataType: selectedRadio,
            data: selectedData
        };

        if(props.updateView) {
            props.updateView(props.viewId, newData);
        }
        setCurrentData(newData);    // Required to force an update of component
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(selectedData);
            return (<VegaLite spec={parsedVega}/>);
        } catch (e) {
            return (<h4>Visualisation unable to compile</h4>)
        }
    }


    function getCorrectInputField() {
        if (selectedRadio === DataType.IMAGE) {
            return (
                <div>
                    <TextField label="Image" value={selectedData}
                               onChange={(e) => setSelectedData(e.target.value)}/>
                    <img src={selectedData} height="300px" alt="Unable to display image"/>
                </div>);
        } else if (selectedRadio === DataType.VEGA) {
            return (<TextareaAutosize value={selectedData} onChange={(e) => setSelectedData(e.target.value)}/>);
        }
    }

    if (!currentData.dataType || currentData.dataType === DataType.EMPTY && props.consoleMode) {
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
                                    <div style={{margin: "30px", width: "600px"}}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Type to display on tablet</FormLabel>
                                            <RadioGroup aria-label="Type to display on tablet" name="tabletDisplay"
                                                        value={selectedRadio}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedRadio((event.target as HTMLInputElement).value)}>
                                                <FormControlLabel value={DataType.IMAGE} control={<Radio/>}
                                                                  label="Image"/>
                                                <FormControlLabel value={DataType.VEGA} control={<Radio/>}
                                                                  label="Vega-Lite"/>
                                                <FormControlLabel value={DataType.EMPTY} control={<Radio/>}
                                                                  label="Empty"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {getCorrectInputField()}
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant="contained" onClick={() => saveChanges()}>
                                    Choose
                                </Button>
                                <Button size="small" color="primary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <ImageCard src={currentData.data} dataType={currentData.dataType} cardStyles={props.cardStyles}/>
        </div>
    );
};