import {makeStyles} from "@material-ui/core/styles";
import {colors, createStyles, Theme} from "@material-ui/core";

export const modalPopupStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            minWidth: 500,
            maxWidth: 1200,
            overflowY: "auto"
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


export const buttonStyle = makeStyles({
    buttonGreen: {
        width: 200,
        height: 50,
        margin: "10px",
        backgroundColor: '#8bad3f',
        color: colors.common.white,
        fontSize: "20px"
    },
    buttonYellow: {
        width: 200,
        height: 50,
        margin: "10px",
        backgroundColor: '#fabb00',
        color: colors.common.white,
        fontSize: "20px"
    },
    buttonRed: {
        width: 200,
        height: 50,
        margin: "10px",
        backgroundColor: '#e2001a',
        color: colors.common.white,
        fontSize: "18px"
    }
});