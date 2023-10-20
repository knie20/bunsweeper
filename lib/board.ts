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
    ): TileState[][] => {
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
    return nextTiles;
}

export const applyToTilesAtCoords = (
    board: BoardState, 
    coords: Coord[], 
    action: (tile: TileState) => TileState
    ): TileState[][] => {
    const applicableYList = coords.map(c => c[1]).filter(onlyUnique).sort();

    const nextTiles = board.tiles.map((tileRow, y) => {
        if (applicableYList.includes(y)){
            return tileRow.map((tile, x) => {
                if(coords.find(c => c[0] === x && c[1] === y)){
                    return action(tile);
                }
                return tile;
            });
        }
        return tileRow;
    });
    return nextTiles;
}

const onlyUnique = (value: number, index: number, array: number[]): boolean => {
    return array.indexOf(value) === index;
}

export const revealTile: (tile: TileState) => TileState 
    = (tile) => ({...tile, revealed: true});
export const markTileWithFlag: (tile: TileState) => TileState 
    = (tile) => ({...tile, mark: TileMark.Flagged});
export const markTileWithQuestion: (tile: TileState) => TileState 
    = (tile) => ({...tile, mark: TileMark.Question});
export const markTileWithBlank: (tile: TileState) => TileState 
    = (tile) => ({...tile, mark: TileMark.Blank});    

export const propagateReveal = (board: BoardState, coord: Coord): TileState[][] => {
    const coordsToReveal = computePropagateCoords(board, coord, [coord]);

    const nextBoard = applyToTilesAtCoords(board, coordsToReveal, revealTile);

    return nextBoard;
}

const computePropagateCoords = (
    board: BoardState, 
    startingCoord: Coord,
    coordsToReveal: Coord[]
    ): Coord[] => {
    const X = startingCoord[0];
    const Y = startingCoord[1];
    const adjacentCoords: Coord[] = filterInvalidCoords([
        [X - 1, Y],
        [X + 1, Y],
        [X, Y - 1],
        [X, Y + 1],
    ], board.xLength, board.yLength);

    adjacentCoords.forEach((c: Coord): void => {
        if(coordsToReveal.find(ec => c[0] === ec[0] && c[1] === ec[1]))
            return;
        
        let tile = board.tiles[c[1]][c[0]];
        if (tile.revealed)
            return;

        coordsToReveal.push(c);

        if (tile.value === TileValue.None)
            coordsToReveal = computePropagateCoords(board, c, coordsToReveal)
    });
    
    return coordsToReveal;
}

export const applyRevealAllBombs = (board: BoardState): TileState[][] => {
    const nextTiles = board.tiles.map((tileRow, y) => {
        return tileRow.map((tile, x) => {
            if(tile.value === TileValue.Bomb){
                tile.revealed = true;
            }
            return tile;
        });
    });
    return nextTiles;
}