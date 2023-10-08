import { BoardState, TileState } from "@/models/BoardState";
import Tile from "./Tile";

export default function Board({boardState}: {
    boardState: BoardState
}) {
    let tiles: any[] = [];
    
    boardState.tiles.map((tileRow, y) => {
        tileRow.map((tile, x) => {
            tiles.push(
                <Tile tileState={tile} key={`(${x},${y})_${buildKey(tile)}`}></Tile>
            )
        })
    })
    
    return <div className="grid grid-flow-row" style={generateBoardGrid(6, 10)}>
        {tiles}
    </div>
}

const buildKey = (tile: TileState) => {
    return `${tile.revealed ? 'revealed' : 'unrevealed'}_${tile.mark.toString()}_${tile.value.toString()}`
};

const generateBoardGrid = (rows: number, columns: number): any => {
    return {
        gridTemplate: `repeat(${rows}, 32px) / repeat(${columns}, 32px)`
    };
}