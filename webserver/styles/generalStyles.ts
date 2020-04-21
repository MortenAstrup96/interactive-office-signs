import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";
import {blueGrey, red} from "@material-ui/core/colors";

export const generalStyle = makeStyles((theme: Theme) =>
    createStyles({
        profile: {
            fontFamily: "Roboto",
            textAlign: "center",
            margin: "30px",
            width: "600px",
        },
        office: {
            fontFamily: "Roboto",
            textAlign: "center",
            margin: "30px",
            marginTop: "30px",
        },
        officeDetail: {
            fontFamily: "Roboto",
            fontSize: "34px",
            margin: "30px",
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
        }
    }),
);

export default createMuiTheme({
    palette: {
        primary: {
            main: blueGrey["500"],
            light: blueGrey["100"],
        },
    }
    }
)


