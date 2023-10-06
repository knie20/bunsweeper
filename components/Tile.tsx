import { TileState, defaultTileState } from "@/models/BoardState";
import TileFace from "./TileFace";

export default function Tile() {
    
    return <>
        <div className="tile-container w-8 h-8">
            <TileFace tileState={defaultTileState}></TileFace>
        </div>
    </>
}