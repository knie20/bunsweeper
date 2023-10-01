import { TileState, defaultTileState } from "@/models/BoardState";
import TileFace from "./TileFace";
import { TileMark, TileValue } from "@/models/TileDisplay";

export default function Tile() {
    
    return <>
        <button className="">
            <TileFace tileState={defaultTileState}></TileFace>
        </button>
    </>
}