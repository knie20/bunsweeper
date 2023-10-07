import { BoardState, testBoardState } from "@/models/BoardState"
import Board from "./Board";

export default function Game() {
    const boardState: BoardState = testBoardState;
    
    return <>
        <Board boardState={boardState}></Board>
    </>
}