import { TileState } from "@/models/BoardState";
import { TileMark, TileValue } from "@/models/TileDisplay";

export default function Tile({tileState, onTileClicked}: {
    tileState: TileState,
    onTileClicked: () => void
}) {
    const face = makeFace(tileState);
    
    return <div className="flex w-8 h-8 font-extrabold border-solid border-2 border-gray-700 grow">
        <div className={getButtonClassName(tileState.revealed)}>
            {face}
        </div>
    </div>
}

const getButtonClassName = (revealed: boolean): string => {
    const base = 'flex grow items-stretch';
    return revealed ? `${base} tile` : `${base} tile-revealed`;
}

const makeFace = (tileState: TileState) => {
    if(!tileState.revealed){
        switch (tileState.mark){
            case TileMark.Blank: {
                return <></>;
            }
            case TileMark.Marked: {
                return <div className="grow">¶</div>;
            }
            case TileMark.Question: {
                return <div className="grow">?</div>;
            }
        }
    } else {
        switch(tileState.value){
            case TileValue.None: {
                return <></>;
            }
            case TileValue.One: {
                return <div className="text-blue-700 grow">1</div>;
            }
            case TileValue.Two: {
                return <div className="text-green-700 grow">2</div>;
            }
            case TileValue.Three: {
                return <div className="text-red-700 grow">3</div>;
            }
            case TileValue.Four: {
                return <div className="text-purple-700 grow">4</div>;
            }
            case TileValue.Five: {
                return <div className="text-orange-500 grow">5</div>;
            }
            case TileValue.Six: {
                return <div className="text-gray-700 grow">6</div>;
            }
            case TileValue.Seven: {
                return <div className="text-amber-900 grow">7</div>;
            }
            case TileValue.Eight: {
                return <div className="text-cyan-700 grow">8</div>;
            }
            case TileValue.Bomb: {
                return <div className="bg-red-600 grow">⊗</div>;
            }
        }
    }
}