import { BoardState, testBoardState } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";

export default function Game() {
    const boardState: BoardState = testBoardState;
    
    return <>
        <GameHeader bombAmount={10} marksUsed={0} bombsRevealed={0}></GameHeader>
        <Board boardState={boardState}></Board>
    </>
}