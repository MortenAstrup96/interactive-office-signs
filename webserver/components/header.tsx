import Container from "@material-ui/core/Container";
import {Divider} from "@material-ui/core";

const auLogo = require("../img/aulogo.png");

const Header = () => (
    <div>
        <Container color="#123">
            <span>
            <h1>Ada-242</h1>
            <p>Department of Computer Science</p>
            </span>
            <img src={auLogo}/>
        </Container>
        <Divider/>
    </div>

)

export default Header