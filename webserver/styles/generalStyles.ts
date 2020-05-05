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
        },
        officeName: {
            fontFamily: "Roboto",
            fontSize: "50px",
            margin: "5px",
            textAlign: "center",
        },
        officeTitle: {
            fontFamily: "Roboto",
            fontSize: "20px",
            margin: "5px",
            textAlign: "center",
        },
        officeDetail: {
            fontSize: "34px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr 3fr",
            flexDirection: "column"
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

