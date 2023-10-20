import { Coord, TileState } from "./BoardState";

export type BoardStateAction = 
    { type: 'new-board', length: number, width: number, bombAmount: number } |
    { type: 'tile-left-clicked', tileState: TileState, coord: Coord } |
    { type: 'tile-right-clicked', tileState: TileState, coord: Coord }
    ;

