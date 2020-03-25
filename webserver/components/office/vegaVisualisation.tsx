import React from 'react';
import ReactDOM from 'react-dom';
import {Vega} from 'react-vega';
import {OfficeAvailabilityProps} from "../../library/general_interfaces";

const spec = {
    "description": "A simple bar chart with embedded data.",
    "mark": "bar",
    "encoding": {
        "x": {"field": "a", "type": "ordinal"},
        "y": {"field": "b", "type": "quantitative"}
    }
};

const barData = {
    table: [
        {"a": "A", "b": 28},
        {"a": "B", "b": 55},
        {"a": "C", "b": 43},
        {"a": "D", "b": 91},
        {"a": "E", "b": 81},
        {"a": "F", "b": 53},
        {"a": "G", "b": 19},
        {"a": "H", "b": 87},
        {"a": "I", "b": 52}
    ]
};

function handleHover(...args) {
    console.log(args);
}

const signalListeners = {hover: handleHover};

ReactDOM.render(
    <Vega spec={spec} data={barData} signalListeners={signalListeners}/>,
    document.getElementById('bar-container')
);
