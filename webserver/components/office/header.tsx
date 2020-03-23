import {Divider, Button} from "@material-ui/core";
import Link from "next/link";

const auLogo = require("../../img/aulogo.png");

/** CSS Properties can be defiend as constants and applied as style={name}*/
const headerStyles = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginLeft: "5px",
    marginRight: "5px"
};

const textStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    fontFamily: 'robotto'
};

// Interface defines what items must be given this Header
interface officeInformationProps {
    office: string
}

const Header = (props: officeInformationProps) => (
    <div>
        <div style={headerStyles}>
            <div style={{position: "relative"}}>
                <img src={auLogo} alt="No image" style={{position: "absolute", width: "250px", bottom: "10px"}}/>
            </div>

            <span style={{textAlign: "right"}}>
                <h1 style={textStyle}>{props.office}</h1>
                <p style={textStyle}>Department of Computer Science</p>
            </span>
        </div>

        <Link href={"/office/" + props.office}>
            <Button variant="contained">
                Far
            </Button>
        </Link>

        <Link href={"/detailed-office/" + props.office}>
            <Button variant="contained">
                Close
            </Button>
        </Link>
        <Divider/>
    </div>
);

export default Header