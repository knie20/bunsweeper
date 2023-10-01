import { BoardState, defaultTileState } from "@/models/BoardState"
import Board from "./Board";

export default function Game() {
    const boardState: BoardState = new BoardState([[defaultTileState]]);
    
    return <>
        <Board boardState={boardState}></Board>
    </>
}