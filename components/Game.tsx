import { BoardState, Coord, TileState } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";
import { useCallback, useEffect, useReducer, useState } from "react";
import { BoardStateAction } from "@/models/Store";
import { applyToTileAtCoord, generateBoard, markTile, propagateReveal, revealTile } from "@/lib/board";
import { TileValue } from "@/models/TileDisplay";

export default function Game({length, width, bombAmount}: {
    length: number,
    width: number,
    bombAmount: number
}) {
    const [marksUsed, setMarksUsed] = useState(0);
    const [bombsRevealed, setBombsRevealed] = useState(0);
    const [boardState, boardStateDispatch] = useReducer(boardReducer, new BoardState([]));
    
    useEffect(() => {
        let generateNewBoardAction: BoardStateAction = {
            type: "new-board",
            length, width, bombAmount
        };
        boardStateDispatch(generateNewBoardAction);
        return () => {}
    }, [length, width, bombAmount])
    
    const handleTileClicked = useCallback((tileState: TileState, coord: Coord) => {
        const rightClickAction: BoardStateAction = {
            type: "tile-left-clicked",
            tileState, coord
        };

        boardStateDispatch(rightClickAction);
    }, []);

    const handleTileRightClicked = useCallback((tileState: TileState, coord: Coord) => {
        const rightClickAction: BoardStateAction = {
            type: "tile-right-clicked",
            tileState, coord
        };

        boardStateDispatch(rightClickAction);
    }, []);
    
    return <>
        <GameHeader bombAmount={bombAmount} marksUsed={marksUsed} bombsRevealed={bombsRevealed}></GameHeader>
        <Board 
            boardState={boardState} 
            onTileClicked={handleTileClicked} 
            onTileRightClicked={handleTileRightClicked}/>
    </>
}

const boardReducer = (state: BoardState, action: BoardStateAction): BoardState => {
    switch(action.type) {
        case ('new-board'): {
            return generateBoard(action.length, action.width, action.bombAmount);
        }
        case ('tile-left-clicked'): {
            if (action.tileState.value === TileValue.None)
                return propagateReveal(state, action.coord);
            return applyToTileAtCoord(state, action.coord, revealTile);
        }
        case ('tile-right-clicked'): {
            return applyToTileAtCoord(state, action.coord, markTile);
        }
    }
}
