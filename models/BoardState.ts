import { TileMark, TileValue } from "./TileDisplay";

export class BoardState {
    tiles: TileState[][] = [];

    get xLength(): number {
        if(this.tiles.length > 0) return this.tiles[0].length;
        return 0;
    }

    get yLength(): number {
        return this.tiles.length;
    }

    constructor(tiles: TileState[][]){
        this.tiles = tiles;
    }

}

export interface TileState {
    revealed: boolean,
    value: TileValue,
    mark: TileMark,
}

export const defaultTileState: TileState = {
    revealed: false,
    value: TileValue.One,
    mark: TileMark.Blank
}