import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme, colors} from "@material-ui/core";


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
            flexDirection: "column"
        },
    }),
);