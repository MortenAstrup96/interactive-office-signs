import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";

export const generalStyle = makeStyles((theme: Theme) =>
    createStyles({
        profile: {
            fontFamily: "Roboto",
            textAlign: "center",
            margin: "10px",
            width: "600px",
        },
        office: {
            fontFamily: "Roboto",
            fontSize: "50px",
            margin: "5px",
            marginTop: "10px",
            textAlign: "center",
            fontWeight: "normal"
        },
        officeName: {
            fontFamily: "Roboto",
            margin: "5px",
            marginLeft: "20px",
            fontSize: "38px",
            marginBottom: 0,
            letterSpacing: "2px",
            fontWeight: "normal"
        },
        officeTitle: {
            fontFamily: "Roboto",
            margin: "5px",
            marginLeft: "20px",
            fontSize: "22px",
            marginTop: 0
        },
        officeMail: {
            margin: "5px",
            marginLeft: "20px",
            fontSize: "18px",
            fontFamily: "Roboto",
            marginBottom: "15px"
        },
    }),
);

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#003d73',
            dark: '#002546',
        },
        secondary: {
            main: '#37a0cb',
            dark: '#003e5c',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    },
});

