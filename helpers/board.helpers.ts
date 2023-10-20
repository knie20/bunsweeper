import { BoardState, Coord as Coord, TileState, initialTileState } from "@/models/BoardState";
import { TileMark, TileValue } from "@/models/TileDisplay";

export const generateBoard = (length: number, width: number, bombAmount: number): BoardState => {
    const tiles: TileState[][] = Array(length).fill(null)
        .map(() => Array(width).fill(null)
            .map(() => {return {...initialTileState}}));

    const bombCoordinate: Coord[] = generateBombCoordinates(length - 1, width - 1, bombAmount);

    const boardState = new BoardState(tiles);

    bombCoordinate.forEach((coord) => {
        addBombToTiles(boardState, coord);
    });

    return boardState;
}

const generateBombCoordinates = (maxX: number, maxY: number, bombAmount: number): Coord[] => {
    let bombCoords: Coord[] = [];
    
    while (bombCoords.length < bombAmount){
        let newBombCoord: Coord = [Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY)];
        
        let isCoordExisting = bombCoords.find(coord => JSON.stringify(newBombCoord) === JSON.stringify(coord));
        if(!isCoordExisting)
            bombCoords.push(newBombCoord);
    }

    return bombCoords;
}

const addBombToTiles = (board: BoardState, coord: Coord): BoardState => {
    let bombTile = board.tiles[coord[0]][coord[1]];
    bombTile.value = TileValue.Bomb;

    updateSurroundingTiles(board, coord);

    return board;
}

const filterInvalidCoords = (coord: Coord[], maxX: number, maxY: number): Coord[] => {
    return coord.filter(c => (
            c[0] > -1 &&
            c[0] < maxX &&
            c[1] > -1 &&
            c[1] < maxY
        ));
}

const updateSurroundingTiles = (board: BoardState, bombCoord: Coord): void => {
    let surroundingCoords: Coord[] = [
        [bombCoord[0] - 1, bombCoord[1] - 1],
        [bombCoord[0] - 1, bombCoord[1]],
        [bombCoord[0] - 1, bombCoord[1] + 1],
        [bombCoord[0], bombCoord[1] - 1],
        [bombCoord[0], bombCoord[1] + 1],
        [bombCoord[0] + 1, bombCoord[1] - 1],
        [bombCoord[0] + 1, bombCoord[1]],
        [bombCoord[0] + 1, bombCoord[1] + 1]
    ];

    surroundingCoords = filterInvalidCoords(surroundingCoords, board.xLength, board.yLength);

    surroundingCoords.forEach(coord => {
        let tile = board.tiles[coord[0]][coord[1]]; 
        if(tile.value != TileValue.Bomb)
            tile.value += 1;
    });
}

export const applyToTileAtCoord = (
    board: BoardState, 
    coord: Coord, 
    action: (tile: TileState) => TileState
    ): BoardState => {
    const nextTiles = board.tiles.map((tileRow, y) => {
        if (y === coord[1]){
            return tileRow.map((tile, x) => {
                if(x === coord[0]){
                    return action(tile);
                }
                return tile;
            });
        }
        return tileRow;
    });
    
    return new BoardState(nextTiles);
}

export const applyToTilesAtCoords = (
    board: BoardState, 
    coordList: Coord[], 
    action: (tile: TileState) => TileState
    ): BoardState => {
    const applicableYList = coordList.map(c => c[1]).filter(onlyUnique).sort();

    const nextTiles = board.tiles.map((tileRow, y) => {
        if (applicableYList.includes(y)){
            return tileRow.map((tile, x) => {
                if(coordList.includes([x, y])){
                    return action(tile);
                }
                return tile;
            });
        }
        return tileRow;
    });
    
    return new BoardState(nextTiles);
}

const onlyUnique = (value: number, index: number, array: number[]): boolean => {
    return array.indexOf(value) === index;
}

export const revealTile: (tile: TileState) => TileState 
    = (tile) => ({...tile, revealed: true});
export const markTile: (tile: TileState) => TileState 
    = (tile) => ({...tile,
        mark: tile.mark === TileMark.Question ?
            TileMark.Blank :
            tile.mark + 1
    });    

export const propagateReveal = (board: BoardState, coord: Coord): BoardState => {
    const coordsToReveal = computePropagateCoords(board, coord);

    const nextBoard = applyToTilesAtCoords(board, coordsToReveal, revealTile);

    return nextBoard;
}

const computePropagateCoords = (board: BoardState, startingCoord: Coord): Coord[] => {
    throw new Error("Function not implemented.");
}
