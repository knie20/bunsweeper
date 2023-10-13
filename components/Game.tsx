import { BoardState, TileState, initialTileState, testBoardState } from "@/models/BoardState"
import Board from "./Board";
import GameHeader from "./GameHeader";

export default function Game({length, width, bombAmount}: {
    length: number,
    width: number,
    bombAmount: number
}) {
    const tBoardState: BoardState = testBoardState;

    const boardState: BoardState = generateBoard(length, width, bombAmount);
    
    return <>
        <GameHeader bombAmount={10} marksUsed={0} bombsRevealed={0}></GameHeader>
        <Board boardState={tBoardState}></Board>
    </>
}

const generateBoard = (length: number, width: number, bombAmount: number): BoardState => {
    const tiles: TileState[][] = Array(length).fill(Array(width).fill(initialTileState));

    const bombCoordinates: [x: number, y: number][] = generateCoordinates(length - 1, width - 1, bombAmount);

    bombCoordinates.forEach(([x, y]) => {
        addBombToTiles(tiles, x, y);
    });

    const boardState = new BoardState(tiles);

    return boardState;
}

const generateCoordinates = (maxX: number, maxY: number, bombAmount: number): [x: number, y: number][] => {
    let bombCoords: [x: number, y: number][] = [];
    
    while (bombCoords.length <= bombAmount){
        let newBombCoords: [x: number, y: number] = [Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY)];
        
        let isCoordsExisting = bombCoords.find(coords => JSON.stringify(newBombCoords) === JSON.stringify(coords));
        if(!isCoordsExisting)
            bombCoords.push(newBombCoords);
    }

    return bombCoords;
}

function addBombToTiles(tiles: TileState[][], x: number, y: number) {
    throw new Error("Function not implemented.");
}

