import { BoardState, Coords, TileState } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";
import { TileMark } from "@/models/TileDisplay";
import { useCallback, useEffect, useReducer, useState } from "react";
import { BoardStateAction } from "@/models/Store";
import { generateBoard } from "@/helpers/board.helpers";

export default function Game({length, width, bombAmount}: {
    length: number,
    width: number,
    bombAmount: number
}) {
    const [marksUsed, setMarksUsed] = useState(0);
    const [bombsRevealed, setBombsRevealed] = useState(0);
    const [boardState, boardStateDispatch] = useReducer(boardReducer, new BoardState([]));
    
    useEffect(() => {
        const generateNewBoardAction: BoardStateAction = {
            type: "new-board",
            length, width, bombAmount
        };
        boardStateDispatch(generateNewBoardAction);
        return () => {}
    }, [length, width, bombAmount])
    
    const handleTileClicked = useCallback((tileState: TileState, coords: Coords) => {
        const rightClickAction: BoardStateAction = {
            type: "tile-left-clicked",
            tileState, coords
        };

        boardStateDispatch(rightClickAction);
    }, []);

    const handleTileRightClicked = useCallback((tileState: TileState, coords: Coords) => {
        const rightClickAction: BoardStateAction = {
            type: "tile-right-clicked",
            tileState, coords
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
            const nextTiles = state.tiles.map((tileRow, y) => {
                if (y === action.coords[1]){
                    return tileRow.map((tile, x) => {
                        if(x === action.coords[0]){
                            tile.revealed = true;
                        }
                        return tile;
                    });
                }
                return tileRow;
            });
            
            return new BoardState(nextTiles);
        }
        case ('tile-right-clicked'): {
            const nextTiles = state.tiles.map((tileRow, y) => {
                if (y === action.coords[1]){
                    return tileRow.map((tile, x) => {
                        if(x === action.coords[0]){
                            tile.mark = 
                                action.tileState.mark === TileMark.Question ?
                                TileMark.Blank :
                                action.tileState.mark + 1
                        }
                        return tile;
                    });
                }
                return tileRow;
            });

            return new BoardState(nextTiles);
        }
    }
}

