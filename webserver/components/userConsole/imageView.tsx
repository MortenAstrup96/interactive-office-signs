import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    Divider,
    Modal,
    Radio,
    RadioGroup,
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

    useEffect(() => {
        setSelectedData("");
    }, [selectedRadio]);

    function saveChanges() {
        const newData = {
            dataType: selectedRadio,
            data: selectedData
        };

        if (props.updateView) {
            props.updateView(props.viewId, newData);
        }
        setCurrentData(newData);    // Required to force an update of component
    }

    function removeCurrentData() {
        setCurrentData({dataType: DataType.EMPTY, data: ""});
    }

    function getVegaView() {
        try {
            const parsedVega = JSON.parse(selectedData);
            return (
                <div>
                    <h4>Vega-lite is data visualization tool</h4>
                    <a href="https://vega.github.io/vega-lite/examples/" target="_blank">more Vega-lite examples</a>
                    <div style={{maxWidth: "1000px", margin: "10px", marginTop: "20px"}}><VegaLite spec={parsedVega}/></div>
                </div>);
        } catch (e) {
            return (
                <div>
                    <h4>Vega-Lite is data visualization tool</h4>
                    <a href="https://vega.github.io/vega-lite/examples/" target="_blank">More Vega-Lite examples</a>
                    <h3 style={{color:"red"}}>Visualisation unable to compile</h3>

            </div>)
        }
    }

    function getCorrectInputField() {
        if (selectedRadio === DataType.IMAGE) {
            return (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField label="Image Link" placeholder="https://www.somewebsite/images/image.jpg"
                               variant="outlined" value={selectedData}
                               style={{width: "100%", margin: "10px", marginBottom: "10px"}}
                               onChange={(e) => setSelectedData(e.target.value)}/>
                    <a href="https://www.lifewire.com/copy-image-web-address-url-1174175" target="_blank" style={{marginBottom: "10px"}}>Paste the image address from a picture found online</a>



                    <img src={selectedData} height="400px" alt="Unable to display image"/>
                </div>);
        } else if (selectedRadio === DataType.CALENDAR) {
            return (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField label="Calendar" placeholder="https://microsoft/mycalendar.ics"
                               variant="outlined" value={selectedData}
                               style={{width: "100%", margin: "10px", marginBottom: "30px"}}
                               onChange={(e) => setSelectedData(e.target.value)}/>
                               <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                   <iframe src={selectedData} height="400px"/>
                                   <div style={{width: "300px", display: "flex", flexDirection: "column", margin: "30px", alignItems: "center"}}>
                                       <h4>Add a view of your calendar for the day</h4>
                                       <p>This will display your appointments for the day from your calendar on the officesign. The appointments can be displayed with title or just as 'busy'</p>
                                       <p>Your calendar is added with a link to the calendars ICS-file that can be published via Outlook Web Application (OWA)</p>
                                       <a href="https://support.office.com/en-us/article/share-your-calendar-in-outlook-on-the-web-7ecef8ae-139c-40d9-bae2-a23977ee58d5" target="_blank">How to publish Outlook calendar</a>
                                   </div>
                               </div>
                </div>);
        } else if (selectedRadio === DataType.VEGA) {
                if(selectedData == "") {
                    setSelectedData("{\n" +
                        "  \"$schema\": \"https://vega.github.io/schema/vega-lite/v4.json\",\n" +
                        "  \"description\": \"A simple bar chart with embedded data.\",\n" +
                        "  \"data\": {\n" +
                        "    \"values\": [\n" +
                        "      {\"a\": \"A\", \"b\": 28}, {\"a\": \"B\", \"b\": 55}, {\"a\": \"C\", \"b\": 43},\n" +
                        "      {\"a\": \"D\", \"b\": 91}, {\"a\": \"E\", \"b\": 81}, {\"a\": \"F\", \"b\": 53},\n" +
                        "      {\"a\": \"G\", \"b\": 19}, {\"a\": \"H\", \"b\": 87}, {\"a\": \"I\", \"b\": 52}\n" +
                        "    ]\n" +
                        "  },\n" +
                        "  \"mark\": \"bar\",\n" +
                        "  \"encoding\": {\n" +
                        "    \"x\": {\"field\": \"a\", \"type\": \"ordinal\", \"axis\": {\"labelAngle\": 0}},\n" +
                        "    \"y\": {\"field\": \"b\", \"type\": \"quantitative\"}\n" +
                        "  }\n" +
                        "}");
                }

            return (
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <TextField label="Vega-Lite" value={selectedData} multiline rows={24} variant="outlined"
                               style={{width: "600px", margin: "10px", marginTop: "20px"}}
                               onChange={(e) => setSelectedData(e.target.value)}/>
                    {getVegaView()}
                </div>
            );
        } else if (selectedRadio === DataType.TEXT) {
            return (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <TextField label="Text" value={selectedData} multiline rows={6} variant="outlined"
                               style={{width: "90%", margin: "20px", marginBottom: "30px"}}
                               onChange={(e) => setSelectedData(e.target.value)}/>
                </div>
            );
        }
    }

    if ((!currentData.dataType || currentData.dataType === DataType.EMPTY) && props.consoleMode) {
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
                                    <div style={{
                                        margin: "20px",
                                        marginLeft: "100px",
                                        marginRight: "100px",
                                        minWidth: "600px",
                                        maxWidth: "1600px"

                                    }}>
                                        <FormControl component="fieldset" style={{width: "100%"}}>
                                            <RadioGroup value={selectedRadio}
                                                        row={true}
                                                        style={{justifyContent: "space-around"}}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedRadio((event.target as HTMLInputElement).value)}>
                                                <FormControlLabel value={DataType.IMAGE} control={<Radio/>}
                                                                  label="Image"
                                                                  labelPlacement="bottom"/>
                                                <FormControlLabel value={DataType.VEGA} control={<Radio/>}
                                                                  label="Vega-Lite"
                                                                  labelPlacement="bottom"/>
                                                <FormControlLabel value={DataType.CALENDAR} control={<Radio/>}
                                                                  label="Calendar"
                                                                  labelPlacement="bottom"/>
                                                <FormControlLabel value={DataType.TEXT} control={<Radio/>}
                                                                  label="Text"
                                                                  labelPlacement="bottom"/>
                                                <FormControlLabel value={DataType.EMPTY} control={<Radio/>}
                                                                  label="Empty"
                                                                  labelPlacement="bottom"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <Divider/>
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

    if (props.consoleMode) {
        return (
            <div>
                <ImageCard src={currentData.data} dataType={currentData.dataType} cardStyles={props.cardStyles}
                           consoleView={true} removeCurrent={removeCurrentData}/>
            </div>
        );
    }
    return (
        <div>
            <ImageCard src={currentData.data} dataType={currentData.dataType} cardStyles={props.cardStyles}
                       removeCurrent={console.log}/>
        </div>
    );
};