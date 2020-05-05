import React, {useState} from "react";
import {Box, Button} from "@material-ui/core";
import {ViewType} from "../../library/enums";


interface ViewControlProps {
    currentViewType: string;

    updateViewType(viewType: string): void;
}

interface ColorButtonProps {
    text: string;
    viewType: ViewType;
}

export const ViewControls: React.FC<ViewControlProps> = props => {
    const [currentFocus, setCurrentFocus] = useState<string>(props.currentViewType);

    // Callback to [personId] with new viewtype
    function handleButtonClick(viewType: ViewType) {
        setCurrentFocus(viewType);
        props.updateViewType(viewType);
    }

    // Custom button to create highlighting of current button
    const ColorButton = (props: ColorButtonProps) => {
        if (props.viewType === currentFocus) {
            return (
                <Button variant="outlined" color="primary"
                        onClick={() => handleButtonClick(props.viewType)}>{props.text}</Button>);
        }
        return (
            <Button variant="outlined" onClick={() => handleButtonClick(props.viewType)}>{props.text}</Button>);
    }


    return (
        <Box width="420px" display="flex" justifyContent="space-between" marginTop="20px" marginBottom="20px">
            <ColorButton text={"Single"} viewType={ViewType.SINGLE}/>
            <ColorButton text={"Double"} viewType={ViewType.DOUBLE}/>
            <ColorButton text={"Triple"} viewType={ViewType.TRIPLE}/>
            <ColorButton text={"Quadruple"} viewType={ViewType.QUADRUPLE}/>
        </Box>
    );
};