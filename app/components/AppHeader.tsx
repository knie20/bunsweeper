import { Card } from "@mui/material";
import { Container } from "postcss";

export default function AppHeader(){
    return (
        <Card className="container px-5 py-5 ">
            <img src="minesweeper_logo.png"></img>
            <h1>MINESWEEPER</h1>
        </Card>
        )
}