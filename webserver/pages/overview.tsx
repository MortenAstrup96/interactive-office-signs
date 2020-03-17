import {Container, List, ListItem, ListItemText, TextField,} from "@material-ui/core";
import useSWR from "swr";
import Link from "next/link";
import {useState} from "react";
import {OfficeInformationProps} from "../library/general_interfaces";

interface NameProp {
    name: string,
    nameId: string
}

export default function Overview() {
    const {data} = useSWR(() => 'http://localhost:3000/api/getPersonData', fetcher);


    const addPersonToDB = (prop: OfficeInformationProps) => {
        fetch('http://localhost:3000/api/addPerson', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(prop)
        });
    };


    /** This function returns a Material UI Listitem with a link, linking to /office/nameId */
    function ListItemLink(props) {
        return (
            <Link href={"/office/" + props.nameId}>
                <ListItem button component="a" {...props.id}>
                    <ListItemText primary={props.name}/>
                </ListItem>
            </Link>
        );
    }



    // Leave me alone!!
    async function fetcher(url) {
        return fetch(url).then(r => r.json());
    }


    if (!data) return (
        <div> <NewForm addPerson={addPersonToDB}/></div>
    );

    return (
        <div>
            <Container>
                <List>
                    {data.map((result: NameProp, index: number) =>
                        <ListItemLink key={index} nameId={result.nameId} name={result.name}/>
                    )}
                </List>
                <NewForm addPerson={addPersonToDB}/>
            </Container>
        </div>
    );
}

const NewForm = ({addPerson}) => {
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
            <TextField type="submit" value="Add Song"/>
        </form>
    );
};