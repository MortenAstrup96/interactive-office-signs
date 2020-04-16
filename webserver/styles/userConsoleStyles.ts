import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";

export const modalPopupStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: 400,
            backgroundColor: "#ffffff",
            border: '2px solid #000',
            boxShadow: "0 0 2 0",
            padding: 5,
        },
        window: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
);

/** ----- CARDS ----- */
export const singleCardStyle = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: 10,
        width: 700,
        height: 700
    },
    rootIcon: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 700, height: 700},
    media: {width: 50, height: 50}
});

export const halfCardStyle = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: 10,
        width: 700,
        height: 340
    },
    rootIcon: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 700, height: 340},
    media: {width: 50, height: 50}
});

export const quarterCardStyle = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: 10,
        width: 340,
        height: 340
    },
    rootIcon: {alignContent: "center", justifyContent: "center", display: "grid", margin: 10, width: 340, height: 340},
    media: {width: 50, height: 50}
});