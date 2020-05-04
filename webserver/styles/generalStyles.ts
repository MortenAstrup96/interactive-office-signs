import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";

interface PaletteIntention {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}

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
        officeDetail: {
            fontFamily: "Roboto",
            fontSize: "34px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr 3fr",
            flexDirection: "column",
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
        success: {
            main: '#8bad3f',
            dark: '#425821',
        },
        warning: {
            main: '#fabb00',
            dark: '#634b03',
        },
        error: {
            main: '#e2001a',
            dark: '#5b0c0c',
        }
    }
});

