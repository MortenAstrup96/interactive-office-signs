import {Divider, Button} from "@material-ui/core";
import Link from "next/link";

const auLogo = require("../../img/aulogo.png");
const textColor = '#002546';


// Interface defines what items must be given this Header
interface officeInformationProps {
    office: string,
    nameId: string
}

export default function Header(props: officeInformationProps) {

    /** CSS Properties can be defiend as constants and applied as style={name}*/
    const headerStyles = {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "20px"
    };

    const textStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        fontFamily: 'Roboto',
        color: textColor,
        height: '20px'
    };
    return (
        <div>
            <div style={headerStyles}>
                <div style={{position: "relative"}}>
                    <img src={auLogo} alt="No image" style={{position: "absolute", width: "300px", bottom: "10px"}}/>
                </div>

                <span style={{textAlign: "right"}}>
                <h2 style={textStyle}>{props.office}</h2>
                <p style={textStyle}>Department of Computer Science</p>
            </span>
            </div>

            <Link href={"/office/" + props.nameId}>
                <Button variant="contained">
                    Far
                </Button>
            </Link>

            <Link href={"/office/details/" + props.nameId}>
                <Button variant="contained">
                    Close
                </Button>
            </Link>
            <Divider/>
        </div>
    );
}