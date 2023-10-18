import { TextField } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";

export default function NumberInput({value, label, valueChangeHook}: {value: number, label: string, valueChangeHook: (value: number) => void}){
    const [inputValue, setInputValue] = React.useState(value)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const rawValue = event?.target?.value
        if(!!rawValue){
            const parsedValue = parseInt(rawValue)
            setInputValue(parsedValue)
            valueChangeHook(parsedValue)
        }

        
    }

    return (
        <TextField  
            type="number" 
            label={label}
            InputProps={{
                inputProps: { min: 0 }
            }}
            value={inputValue}
            onChange={handleInputChange} 
            className="p-4"
            />
    )
}