import {useState} from "react";
import {colors, OutlinedInput, TextField} from "@material-ui/core";
import {UserInformation} from "../../library/general_interfaces";
import {serverName} from "../../library/constants";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "auto"

};

export const CreateAccountForm = () => {
    const addUser = (prop: { mail: string; calendarURL: string; bottomView: { data: string; viewType: string }; fourthView: { data: string; dataType: string }; customView: { data: string; dataType: string }; thirdView: { data: string; dataType: string }; officeId: string; topView: { data: string; viewType: string }; name: string; viewType: string; nameId: string; firstView: { data: string; dataType: string }; secondView: { data: string; dataType: string }; status: string }) => {
        fetch(serverName + '/api/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prop)
        });
    };


    const [name, setName] = useState("");
    const [nameId, setNameId] = useState("");
    const [office, setOffice] = useState("");
    const [mail, setMail] = useState("");
    const [pin, setPin] = useState("");
    const [calendarURL, setCalenderURL] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        addUser({
            officeId: office,
            nameId: nameId,
            name: name,
            mail: mail,
            status: "Available",
            calendarURL: calendarURL,
            topView: {viewType: "", data: ""},
            bottomView: {viewType: "", data: ""},
            viewType: "",
            firstView: {dataType: "", data: ""},
            secondView: {dataType: "", data: ""},
            thirdView: {dataType: "", data: ""},
            fourthView: {dataType: "", data: ""},
            customView: {dataType: "", data: ""}
        });
        setName("");
        setNameId("");
        setOffice("");
        setMail("");
        setPin("")
        setCalenderURL("")
    };
    return (
        <form onSubmit={handleSubmit}>
            <div style={gridStyle}>
                <TextField type="text" value={name} required onChange={(e) => setName(e.target.value)}
                           variant="outlined"
                           label="Name"
                           style={{margin: "10px"}}/>

                <TextField type="text" value={nameId} required onChange={(e) => setNameId(e.target.value)}
                           variant="outlined" label="Username" style={{margin: "10px"}}/>

                <TextField type="text" value={pin} required onChange={(e) => setPin(e.target.value)}
                           variant="outlined" label="PIN Code" style={{margin: "10px", marginBottom: "60px"}}/>


                <TextField type="text" value={office} required onChange={(e) => setOffice(e.target.value)}
                           variant="outlined" label="Office" style={{margin: "10px"}}/>

                <TextField type="text" value={mail} required onChange={(e) => setMail(e.target.value)}
                           variant="outlined"
                           label="Mail" style={{margin: "10px", marginBottom: "60px"}}/>

                <TextField type="text" value={calendarURL} required onChange={(e) => setCalenderURL(e.target.value)}
                           variant="outlined"
                           label="Calendar HTML URL" style={{margin: "10px", marginBottom: "60px"}}/>
            </div>

            <OutlinedInput type="submit" value="Create Account"
                           style={{
                               margin: "10px",
                               justifySelf: "center",
                               backgroundColor: colors.blue.A400,
                               color: "white"
                           }}/>
        </form>
    );
};