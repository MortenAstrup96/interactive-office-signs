import {List, ListItem, ListItemText} from "@material-ui/core";
import useSWR from "swr";
import {useEffect, useState} from "react";
import {OfficeInformationProps} from "../library/general_interfaces";

export default function Overview() {
    const {data, error} = useSWR(() => 'http://localhost:3000/api/getAll', fetcher);
    const [listData, setListData] = useState();

    useEffect(() => {
        setListData(data);
    }, [data]);


    function ListItemLink(props) {
        return <ListItem button component="a" {...props.name} />;
    }

    function RenderList() {

    }


    async function fetcher(url) {
        return fetch(url).then(r => r.json());
    }

    if(!data) return (<div><p>Loading..</p></div>);

    return (
        <div>

        </div>
    );
}