import {Button} from "@material-ui/core";
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "../../img/icons/iconDelete";

interface CustomButtonInfo {
    text: string;
    color: string;
    position: number;

    removeSelf(position: number): void;

    selectButton(buttonInfo: any): void;
}

export const CustomButton = (props: CustomButtonInfo) => {
    return (
        <div style={{display: "flex"}}>
            <Button variant="contained" onClick={() => props.selectButton({text: props.text, color: props.color})}
                    style={{
                        backgroundColor: props.color,
                        color: "#ffffff",
                        width: "200px",
                        height: "50px",
                        margin: "10px",
                        fontSize: "18px"
                    }}>{props.text}</Button>
            <IconButton aria-label="delete" onClick={() => props.removeSelf(props.position)}
                        style={{margin: 0, padding: 0}}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
};