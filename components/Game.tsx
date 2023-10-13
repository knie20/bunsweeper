import { BoardState, Coords, TileState, initialTileState, testBoardState } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";
import { TileValue } from "@/models/TileDisplay";

export default function Game({length, width, bombAmount}: {
    length: number,
    width: number,
    bombAmount: number
}) {
    const boardState: BoardState = generateBoard(length, width, bombAmount);
    
    return <>
        <GameHeader bombAmount={10} marksUsed={0} bombsRevealed={0}></GameHeader>
        <Board boardState={boardState}></Board>
    </>
}

const generateBoard = (length: number, width: number, bombAmount: number): BoardState => {
    const tiles: TileState[][] = Array(length).fill(null)
        .map(() => Array(width).fill(null)
            .map(() => {return {...initialTileState}}));

    const bombCoordinates: Coords[] = generateCoordinates(length - 1, width - 1, bombAmount);

    const boardState = new BoardState(tiles);

    bombCoordinates.forEach((coords) => {
        addBombToTiles(boardState, coords);
    });

    return boardState;
}

const generateCoordinates = (maxX: number, maxY: number, bombAmount: number): Coords[] => {
    let bombCoords: Coords[] = [];
    
    while (bombCoords.length <= bombAmount){
        let newBombCoords: Coords = [Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY)];
        
        let isCoordsExisting = bombCoords.find(coords => JSON.stringify(newBombCoords) === JSON.stringify(coords));
        if(!isCoordsExisting)
            bombCoords.push(newBombCoords);
    }

    return bombCoords;
}

const addBombToTiles = (board: BoardState, coords: Coords): BoardState => {
    let bombTile = board.tiles[coords[0]][coords[1]];
    bombTile.value = TileValue.Bomb;

    updateSurroundingTiles(board, coords);

    return board;
}

const filterInvalidCoords = (coords: Coords[], maxX: number, maxY: number): Coords[] => {
    return coords.filter(c => (
            c[0] > -1 &&
            c[0] < maxX &&
            c[1] > -1 &&
            c[1] < maxY
        ));
}

const updateSurroundingTiles = (board: BoardState, bombCoords: Coords): void => {
    let surroundingCoords: Coords[] = [
        [bombCoords[0] - 1, bombCoords[1] - 1],
        [bombCoords[0] - 1, bombCoords[1]],
        [bombCoords[0] - 1, bombCoords[1] + 1],
        [bombCoords[0], bombCoords[1] - 1],
        [bombCoords[0], bombCoords[1] + 1],
        [bombCoords[0] + 1, bombCoords[1] - 1],
        [bombCoords[0] + 1, bombCoords[1]],
        [bombCoords[0] + 1, bombCoords[1] + 1]
    ];

    surroundingCoords = filterInvalidCoords(surroundingCoords, board.xLength, board.yLength);

    surroundingCoords.forEach(coord => {
        let tile = board.tiles[coord[0]][coord[1]]; 
        if(tile.value !== TileValue.Bomb)
            tile.value += 1;
    });
}

