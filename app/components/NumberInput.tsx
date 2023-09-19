import { TextField } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";

export default function NumberInput(props: {value: number, label: string}){
    const [inputValue, setInputValue] = React.useState(props.value)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const rawValue = event?.target?.value
        if(!!rawValue){
            setInputValue(parseInt(rawValue))
        }
    }

    return (
        <TextField  type="number" 
     label={props.label}
     InputProps={{
        inputProps: { min: 0 }
      }}
     value={props.value}
     onChange={handleInputChange} />
    )
}