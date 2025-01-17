import {Container, List, ListItem, ListItemText,} from "@material-ui/core";
import useSWR from "swr";
import Link from "next/link";

interface NameProp {
    name: string,
    nameId: string
}

export default function Tablets() {
    const {data} = useSWR(() => '/api/getUserData', fetcher);


    // This function returns a Material UI List-item with a link, linking to /tablet/nameId
    function ListItemLink(props: any) {
        return (
            <Link href={"/office/" + props.nameId}>
                <ListItem button component="a" {...props.id}>
                    <ListItemText primary={props.name}/>
                </ListItem>
            </Link>
        );
    }

    // Leave me alone <:-( !!
    async function fetcher(url: string) {
        return fetch(url).then(r => r.json());
    }


    if (!data) return (
        <div>
        </div>
    );

    return (
        <div>
            <Container>
                <List>
                    {data.map((result: NameProp, index: number) =>
                        <ListItemLink key={index} nameId={result.nameId} name={result.name}/>
                    )}
                </List>
            </Container>
        </div>
    );
}