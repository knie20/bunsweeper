import { Coord, TileState } from "@/models/BoardState";
import { TileMark, TileValue } from "@/models/TileDisplay";
import React from "react";

export default function Tile({tileState, coord: coord, onTileClicked, onTileRightClicked}: {
    tileState: TileState,
    coord: Coord,
    onTileClicked: (tileState: TileState, coord: Coord) => void,
    onTileRightClicked: (tileState: TileState, coord: Coord) => void
}) {
    const face = makeFace(tileState);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (evt) => {
        if (evt.type === 'contextmenu')
            evt.preventDefault();
        
        if(tileState.revealed) 
            return;

        if (evt.type === 'click' && tileState.mark == TileMark.Blank)
            onTileClicked(tileState, coord);
        else if (evt.type === 'contextmenu')
            onTileRightClicked(tileState, coord);
    }
    
    return <div className="flex w-8 h-8 font-extrabold border-solid border-4 border-gray-500 grow tile">
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
        base += ' bg-gray-100 hover:bg-gray-200 active:bg-blue-200';
    else if(tileState.value === TileValue.Bomb)
        base += ' bg-red-400'
    else 
        base += ' bg-gray-400';

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
                color = 'text-black';
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
            case TileMark.Flagged:
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