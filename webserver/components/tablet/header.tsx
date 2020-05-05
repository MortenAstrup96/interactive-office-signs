import {Divider, Button, IconButton} from "@material-ui/core";
import Link from "next/link";

const auLogo = require("../../img/aulogo.png");
const textColor = '#002546';


// Interface defines what items must be given this Header
interface officeInformationProps {
    office: string,
    nameId: string,
    name: string,
    mail: string
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
        marginTop: '20px',
        marginBottom: '20px',
        fontFamily: 'Roboto',
        color: textColor,
        height: '20px'
    };

    return (
        <div>
            <div style={headerStyles}>


                <div style={{position: "relative"}}>
                    <Link href={"/"}>
                        <a>
                            <img src={auLogo} alt="No image"
                                 style={{position: "absolute", width: "300px", bottom: "10px", marginBottom: "10px"}}/>
                        </a>

                    </Link>
                </div>


                <span style={{textAlign: "right"}}>
                <h1 style={textStyle}>{props.office}</h1>
                <p style={textStyle}>Department of Computer Science</p>
            </span>
            </div>
            <Divider/>

            <Link href={"/office/" + props.nameId}>
                <Button variant="text" color="primary">
                    Far
                </Button>
            </Link>

            <Link href={"/office/details/" + props.nameId}>
                <Button variant="text" color="primary">
                    Close
                </Button>
            </Link>
        </div>
    );
}