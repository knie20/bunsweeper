import { TileState } from "@/models/BoardState";
import { TileMark, TileValue } from "@/models/TileDisplay";

export default function TileFace({tileState}: {tileState: TileState}) {
    const button = makeButton(tileState);
    
    return <>
        {button}
    </>
}

const makeButton = (tileState: TileState) => {

    
    if(!tileState.revealed){
        switch (tileState.mark){
            case TileMark.Blank: {
                return <button className="tile"></button>
            }
            case TileMark.Marked: {
                return <button className="tile marked">¶</button>
            }
            case TileMark.Question: {
                return <button className="tile question">?</button>
            }
        }
    } else {
        switch(tileState.value){
            case TileValue.None: {
                return <button className="tile revealed"></button>
            }
            case TileValue.One: {
                return <button className="tile revealed text-blue-700">1</button>
            }
            case TileValue.Two: {
                return <button className="tile revealed text-green-700"></button>
            }
            case TileValue.Three: {
                return <button className="tile revealed text-red-700"></button>
            }
            case TileValue.Four: {
                return <button className="tile revealed text-purple-700"></button>
            }
            case TileValue.Five: {
                return <button className="tile revealed text-orange-500"></button>
            }
            case TileValue.Six: {
                return <button className="tile revealed text-gray-700"></button>
            }
            case TileValue.Seven: {
                return <button className="tile revealed text-amber-900"></button>
            }
            case TileValue.Eight: {
                return <button className="tile revealed text-cyan-700"></button>
            }
            case TileValue.Bomb: {
                return <button className="tile revealed-bomb">*</button>
            }
        }
    }
}