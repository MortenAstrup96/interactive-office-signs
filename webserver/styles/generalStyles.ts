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
            fontSize: "60px",
            fontStyle: "bold",
            textAlign: "center",
            margin: "10px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
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

export default createMuiTheme({
        palette: {
            primary: {
                main: blueGrey["500"],
                light: blueGrey["100"],
            }
        }
    }
)


