import { TileState, defaultTileState } from "@/models/BoardState";
import TileFace from "./TileFace";

export default function Tile() {
    
    return <>
        <div className="tile-container flex w-8 h-8 justify-center items-center">
            <TileFace tileState={defaultTileState}></TileFace>
        </div>
    </>
}