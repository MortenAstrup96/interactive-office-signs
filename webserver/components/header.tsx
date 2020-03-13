import Container from "@material-ui/core/Container";
import {Divider} from "@material-ui/core";

const auLogo = require("../img/aulogo.png");

/** CSS Properties can be defiend as constants and applied as style={name}*/
const headerStyles = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginLeft: "20px",
    marginRight: "20px"
}

const textStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    fontFamily: 'sans-serif'
}

// Interface defines what items must be given this Header
interface officeInformationProps {
    office: string
}

const Header = (props: officeInformationProps) => (
    <div>
        <div style={headerStyles}>
            <div style={{position: "relative"}}>
                <img src={auLogo} style={{position: "absolute", width: "250px", bottom: "10px"}}/>
            </div>

            <span style={{textAlign: "right", minHeight: "80px"}}>
                <h1 style={textStyle}>{props.office}</h1>
                <p style={textStyle}>Department of Computer Science</p>
            </span>
        </div>
        <Divider/>
    </div>


)

export default Header