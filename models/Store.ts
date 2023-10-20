import { Coords, TileState } from "./BoardState";

export type BoardStateAction = 
    { type: 'new-board', length: number, width: number, bombAmount: number } |
    { type: 'tile-left-clicked', tileState: TileState, coords: Coords } |
    { type: 'tile-right-clicked', tileState: TileState, coords: Coords }
    ;

