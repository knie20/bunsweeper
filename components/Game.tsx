import { BoardState, Coord, TileState, gameStatus } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { BoardStateAction } from "@/models/Store";
import { applyToTileAtCoord, generateBoard, markTileWithBlank as clearTileMark, markTileWithFlag, markTileWithQuestion, propagateReveal, revealTile, applyRevealAllBombs, markTileWithBlank } from "@/lib/board";
import { TileMark, TileValue } from "@/models/TileDisplay";

export default function Game({length, width, bombAmount}: {
    length: number,
    width: number,
    bombAmount: number
}) {
    const [gameStatus, setGameStatus]: [gameStatus, any] = useState("inprogress");
    const [boardState, boardStateDispatch] = useReducer(boardReducer, new BoardState([]));

    useEffect(() => {
        let generateNewBoardAction: BoardStateAction = {
            type: "new-board",
            length, width, bombAmount
        };
        boardStateDispatch(generateNewBoardAction);
        return () => {}
    }, [length, width, bombAmount])

    useEffect(() => {
        setGameStatus(boardState.status);
    }, [boardState.status])

    useEffect(() => {
        let markedBombs = boardState.tiles.flat()
            .filter(t => t.value === TileValue.Bomb && t.mark === TileMark.Flagged)
        
        if(markedBombs.length === bombAmount)
            setGameStatus("won");
    }, [boardState.marks])
    
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
        <GameHeader bombAmount={bombAmount} marksUsed={boardState.marks} gameStatus={gameStatus}></GameHeader>
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
            if (action.tileState.value === TileValue.Bomb){
                return new BoardState(applyRevealAllBombs(state), state.marks, "lost");
            }
            if (action.tileState.value === TileValue.None)
                return new BoardState(propagateReveal(state, action.coord), state.marks, state.status);
            return new BoardState(applyToTileAtCoord(state, action.coord, revealTile), state.marks, state.status);
        }
        case ('tile-right-clicked'): {
            switch(state.tiles[action.coord[1]][action.coord[0]].mark){
                case (TileMark.Blank): {
                    return new BoardState(applyToTileAtCoord(state, action.coord, markTileWithFlag), state.marks + 1, state.status);
                } case (TileMark.Flagged): {
                    return new BoardState(applyToTileAtCoord(state, action.coord, markTileWithQuestion), state.marks -1, state.status);
                } case (TileMark.Question): {
                    return new BoardState(applyToTileAtCoord(state, action.coord, markTileWithBlank), state.marks, state.status);
                }
            }
        }
    }
}


