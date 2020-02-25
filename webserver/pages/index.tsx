import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import {fetcher} from "../library/general_functions";
import {useEffect, useState} from "react";

export default function Index() {
    const { data, error } = useSWR('/api/apiExample', fetcher);
    // The following line has optional chaining, added in Next.js v9.1.5,
    // is the same as `data && data.author`

    console.log(data);
  
    return (
        <div>{}</div>
    );
}