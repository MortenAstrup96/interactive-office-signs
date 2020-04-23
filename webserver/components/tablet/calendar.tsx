import React from "react";

interface CalendarInformation {
    url: string;
}
export const Calendar = (props: CalendarInformation) => {
    return( <iframe src={props.url} width={600} height={600} frameBorder={0}></iframe>)
};