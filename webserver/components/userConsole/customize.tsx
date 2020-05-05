import React, {useState} from "react";
import {ViewControls} from "./viewControls";
import {Container, Divider, Button, Modal, Card, CardContent, Box, ThemeProvider} from "@material-ui/core";
import {ViewId, ViewType} from "../../library/enums";
import {SingleView} from "./viewTypes/singleView";
import {DoubleView} from "./viewTypes/doubleView";
import {TripleView} from "./viewTypes/tripleView";
import {QuadrupleView} from "./viewTypes/quadrupleView";
import {CustomView} from "./viewTypes/customView";
import {ProfileSettings} from "./profileSettings";
import {UserInformation, ViewData} from "../../library/general_interfaces";
import OfficeInformationId from "../../pages/office/details/[personId]";
import {theme} from "../../styles/generalStyles";

interface customizeInfo {
    currentUser: UserInformation;

    setCurrentUser(prevState: any): void;

    save(): void;
}

export const Customize = (props: customizeInfo) => {
    const [showModal, setShowModal] = useState(false);


    function updateImage(viewId: ViewId, viewData: ViewData) {
        switch (viewId) {
            case ViewId.FIRST:
                props.setCurrentUser((prevState: any) => ({
                    ...prevState,
                    firstView: viewData
                }));
                break;
            case ViewId.SECOND:
                props.setCurrentUser((prevState: any) => ({
                    ...prevState,
                    secondView: viewData
                }));
                break;
            case ViewId.THIRD:
                props.setCurrentUser((prevState: any) => ({
                    ...prevState,
                    thirdView: viewData
                }));
                break;
            case ViewId.FOURTH:
                props.setCurrentUser((prevState: any) => ({
                    ...prevState,
                    fourthView: viewData
                }));
                break;
        }
    }

    function openPreviewModal() {

    }

    /** ----- USER INTERFACE ----- */
    function updateViewType(viewType: string) {
        props.setCurrentUser((prevState: any) => ({
            ...prevState,
            viewType: viewType,
        }))
    }

    function getCards() {
        if (!props.currentUser) {
            return <h4>Unable to load cards</h4>
        } else {
            switch (props.currentUser.viewType) {
                case ViewType.SINGLE:
                    return <SingleView firstView={props.currentUser.firstView} consoleMode={true}
                                       updateView={updateImage}/>;
                case ViewType.DOUBLE:
                    return <DoubleView firstView={props.currentUser.firstView} secondView={props.currentUser.secondView}
                                       consoleMode={true} updateView={updateImage}/>;
                case ViewType.TRIPLE:
                    return <TripleView firstView={props.currentUser.firstView} secondView={props.currentUser.secondView}
                                       thirdView={props.currentUser.thirdView} consoleMode={true}
                                       updateView={updateImage}/>
                case ViewType.QUADRUPLE:
                    return <QuadrupleView firstView={props.currentUser.firstView}
                                          secondView={props.currentUser.secondView}
                                          thirdView={props.currentUser.thirdView}
                                          fourthView={props.currentUser.fourthView}
                                          consoleMode={true} updateView={updateImage}/>;
                case ViewType.CUSTOM:
                    return <CustomView customView={props.currentUser.customView}/>;
                default:
                    return <h4>Unable to load the cards</h4>
            }
        }
    }

    return (
        <Container style={{display: " flex", flexDirection: "column", alignItems: "center"}}>
            <ThemeProvider theme={theme}>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "50px"
                }}
            >
                <Card style={{height: "100%", overflowY: "hidden"}}>
                    <CardContent style={{overflow: "scroll", height: "100%", width: "1050px"}}>
                        <OfficeInformationId/>
                    </CardContent>
                </Card>

            </Modal>
            <ProfileSettings user={props.currentUser}/>
            <Divider variant="fullWidth" style={{width: "700px", marginTop: "30px", marginBottom: "20px"}}/>

                <Divider variant="fullWidth" style={{width: "700px", marginTop: "30px", marginBottom: "20px"}}/>
            <ViewControls currentViewType={props.currentUser.viewType} updateViewType={updateViewType}/>
            {getCards()}
                <div style={{marginTop: "20px"}}>
                    <Button onClick={props.save} variant="contained" color="primary" style={{margin: "5px"}}>Save Changes</Button>
                    <Button onClick={() => {
                        setShowModal(true);
                        props.save();
                    }} variant="contained" color="primary">Save & Preview</Button>
                </div>
            </ThemeProvider>
        </Container>
    );
}