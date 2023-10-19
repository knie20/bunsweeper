import { BoardState, Coords, TileState } from "@/models/BoardState";
import Tile from "./Tile";

export default function Board({boardState, onTileClicked}: {
    boardState: BoardState
    onTileClicked: (tileState: TileState, coords: Coords) => void
}) {
    let tiles: any[] = [];
    
    boardState.tiles.map((tileRow, y) => {
        tileRow.map((tile, x) => {
            tiles.push(
                <Tile tileState={tile} coords={[x, y]} onTileClicked={onTileClicked} key={`(${x},${y})_${buildKey(tile)}`}></Tile>
            )
        })
    })

    return <div className="grid grid-flow-row overflow-scroll" style={generateBoardGrid(boardState.xLength, boardState.yLength)}>
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

function onTileClicked(): void {
    throw new Error("Function not implemented.");
}
