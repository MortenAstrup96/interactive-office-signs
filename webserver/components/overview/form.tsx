import {useState} from "react";
import {TextField} from "@material-ui/core";

export const Form = ({addPerson}) => {
    const [name, setName] = useState("");
    const [nameId, setNameId] = useState("");
    const [office, setOffice] = useState("");
    const [mail, setMail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        addPerson({office: office, nameId: nameId, name: name, mail: mail, status: "available"});
        setName("");
        setNameId("");
        setOffice("");
        setMail("");
    };
    return(
        <form onSubmit={handleSubmit}>
            <TextField type="text" value={name} required onChange={(e) => setName(e.target.value)} variant="outlined" label="Name"/>
            <TextField type="text" value={nameId} required onChange={(e) => setNameId(e.target.value)} variant="outlined" label="Name ID"/>
            <TextField type="text" value={office} required onChange={(e) => setOffice(e.target.value)} variant="outlined" label="Office"/>
            <TextField type="text" value={mail} required onChange={(e) => setMail(e.target.value)} variant="outlined" label="Mail"/>
            <TextField type="submit" value="Add to database"/>
        </form>
    );
};