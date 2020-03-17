import {List, ListItem, ListItemText} from "@material-ui/core";
import useSWR from "swr";
import {useEffect, useState} from "react";
import Link from "next/link";

interface NameProp {
    name: string,
    nameId: string
}

export default function Overview() {
    const {data, error} = useSWR(() => 'http://localhost:3000/api/getPersonData', fetcher);

    function ListItemLink(props) {
        return (
            <Link href={"/office/" + props.nameId}>
                <ListItem button component="a" {...props.id}>
                    <ListItemText primary={props.name}/>
                </ListItem>
            </Link>
        );
    }

    async function fetcher(url) {
        return fetch(url).then(r => r.json());
    }

    if (!data) return (
        <div><p>Loading..</p></div>
    );

    return (
        <div>
            <List>
                {data.map((result: NameProp, index: number) =>
                    <ListItemLink key={index} nameId={result.nameId} name={result.name}/>
                )}
            </List>
        </div>
    );
}