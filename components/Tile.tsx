import { TileState } from "@/models/BoardState";
import TileFace from "./TileFace";

export default function Tile({tileState}: {tileState: TileState}) {
    
    return <>
        <div className="tile-container flex w-8 h-8 justify-center items-stretch">
            <TileFace tileState={tileState}></TileFace>
        </div>
    </>
}