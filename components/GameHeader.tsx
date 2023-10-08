import { BoardState, testBoardState } from "@/models/BoardState"
import Board from "./Board";

export default function GameHeader({bombAmount, marksUsed, bombsRevealed}: 
    {
        bombAmount: number, 
        marksUsed: number,
        bombsRevealed: number
    }
    ) {
    
    
    return <div className="flex flex-row justify-around align-bottom">
        <p>Bombs: {bombAmount}</p>
        <img width="100px" src={getImgSrc(bombsRevealed > 0)} />
        <p>Marks Used: {marksUsed}</p>
    </div>
}

const getImgSrc = (isDed: boolean) => isDed ? "ded.png" : "helthy.png";