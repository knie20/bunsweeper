import { Coords, TileState } from "@/models/BoardState";
import { TileMark, TileValue } from "@/models/TileDisplay";
import React from "react";

export default function Tile({tileState, coords, onTileClicked, onTileRightClicked}: {
    tileState: TileState,
    coords: Coords,
    onTileClicked: (tileState: TileState, coords: Coords) => void,
    onTileRightClicked: (tileState: TileState, coords: Coords) => void
}) {
    const face = makeFace(tileState);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (evt) => {
        if(tileState.revealed) return;

        if (evt.type === 'click'){
            onTileClicked(tileState, coords);
        } else if (evt.type === 'contextmenu'){
            evt.preventDefault();
            onTileRightClicked(tileState, coords);
        }
    }
    
    return <div className="flex w-8 h-8 font-extrabold border-solid border-2 border-gray-700 grow">
        <div 
            className={getButtonClassName(tileState)} 
            onClick={handleClick}
            onContextMenu={handleClick}
            >
            {face}
        </div>
    </div>
}

const getButtonClassName = (tileState: TileState): string => {
    let base = 'flex grow items-stretch justify-center items-center cursor-pointer';
    if(!tileState.revealed)
        base += ' tile';
    else 
        base += ' tile-revealed';

    let color = '';

    if(tileState.revealed) {
        switch(tileState.value){
            case TileValue.One:
                color = 'text-blue-700';
                break;
            case TileValue.Two:
                color = 'text-green-700';
                break;
            case TileValue.Three:
                color = 'text-red-700';
                break;
            case TileValue.Four:
                color = 'text-purple-700';
                break;
            case TileValue.Five:
                color = 'text-orange-500';
                break;
            case TileValue.Six:
                color = 'text-gray-700';
                break;
            case TileValue.Seven:
                color = 'text-amber-900';
                break;
            case TileValue.Eight: 
                color = 'text-cyan-700';
                break;
            case TileValue.Bomb:
                color = 'bg-red-600';
                break;
        }
    }

    return `${base} ${color}`;
}

const makeFace = (tileState: TileState) => {
    if(!tileState.revealed){
        switch (tileState.mark){
            case TileMark.Blank:
                return '';
            case TileMark.Marked:
                return '¶';
            case TileMark.Question:
                return '?';
        }
    } else {
        if(tileState.value === TileValue.None)
            return '';
        if(tileState.value === TileValue.Bomb)
            return '⊗';
        return tileState.value.toString();
    }
}