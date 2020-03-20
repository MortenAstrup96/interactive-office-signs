import {Container, List, ListItem, ListItemText,} from "@material-ui/core";
import useSWR from "swr";
import Link from "next/link";
import {OfficeInformationProps} from "../library/general_interfaces";
import {Form} from "../components/index/form";
import {serverName} from "../library/constants";

interface NameProp {
    name: string,
    nameId: string
}

export default function Index() {
    const {data} = useSWR(() => serverName + '/api/getUserData', fetcher);


    const addUserToDB = (prop: OfficeInformationProps) => {
        fetch(serverName + '/api/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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

    console.log(data);


    if (!data) return (
        <div><Form addUser={addUserToDB}/></div>
    );

    return (
        <div>
            <Container>
                <List>
                    {data.map((result: NameProp, index: number) =>
                        <ListItemLink key={index} nameId={result.nameId} name={result.name}/>
                    )}
                </List>
                <Form addUser={addUserToDB}/>
            </Container>
        </div>
    );
}