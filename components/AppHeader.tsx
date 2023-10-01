import { Card } from "@mui/material";
import { Container } from "postcss";

export default function AppHeader(){
    return (
        <div className="container px-5 py-5">
            <img src="minesweeper_logo.png" className="mx-auto"></img>
            <h1 className="text-center">MINESWEEPER</h1>
        </div>
        )
}