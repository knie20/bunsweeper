import { BoardState, Coord, TileState } from "@/models/BoardState";
import Tile from "./Tile";

export default function Board({boardState, onTileClicked, onTileRightClicked}: {
    boardState: BoardState,
    onTileClicked: (tileState: TileState, coord: Coord) => void,
    onTileRightClicked: (tileState: TileState, coord: Coord) => void
}) {
    let tiles: any[] = [];
    
    boardState.tiles.map((tileRow, y) => {
        tileRow.map((tile, x) => {
            tiles.push(
                <Tile 
                tileState={tile} 
                coord={[x, y]} 
                onTileClicked={onTileClicked} 
                onTileRightClicked={onTileRightClicked}
                key={`(${x},${y})_${buildKey(tile)}`}/>
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
