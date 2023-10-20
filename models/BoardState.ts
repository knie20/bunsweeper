import { TileMark, TileValue } from "./TileDisplay";

export type Coord = [x: number, y: number]; 

export class BoardState {
    tiles: TileState[][] = [];

    status: gameStatus = "inprogress";
    marks: number = 0;

    get yLength(): number {
        if(this.tiles.length > 0) return this.tiles[0].length;
        return 0;
    }

    get xLength(): number {
        return this.tiles.length;
    }

    public constructor(tiles: TileState[][], marks?: number, status?: gameStatus){
        this.marks = marks ?? 0;
        this.status = status ?? "inprogress";
        this.tiles = tiles;
    }

}

export interface TileState {
    revealed: boolean,
    value: TileValue,
    mark: TileMark,
}

export const initialTileState: TileState = {
    revealed: false,
    value: TileValue.None,
    mark: TileMark.Blank
}

export const getAllTileStates: (() => TileState[][]) = () => {
    let revealedMarkCombinations : [boolean, TileMark][] = [
        [true, TileMark.Blank],
        [true, TileMark.Flagged],
        [true, TileMark.Question],
        [false, TileMark.Blank],
        [false, TileMark.Flagged],
        [false, TileMark.Question],
    ];

    let allTileValues = [
        TileValue.None,
        TileValue.One,
        TileValue.Two,
        TileValue.Three,
        TileValue.Four,
        TileValue.Five,
        TileValue.Six,
        TileValue.Seven,
        TileValue.Eight,
        TileValue.Bomb
    ]

    let result: TileState[][] = [];
    revealedMarkCombinations.forEach(([revealed, mark]: [boolean, TileMark]) => {
        result.push(
            allTileValues
            .map(value => {
                return {
                    value,
                    revealed,
                    mark 
                };
        }));
    });

    return result;
}

export const testBoardState: BoardState = new BoardState(getAllTileStates());

export type gameStatus = "inprogress" | "lost" | "won";