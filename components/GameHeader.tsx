import { gameStatus } from "@/models/BoardState";

export default function GameHeader({bombAmount, marksUsed, gameStatus}: 
    {
        bombAmount: number, 
        marksUsed: number,
        gameStatus: gameStatus
    }
    ) {
    
    
    return <div className="flex flex-row justify-around align-bottom">
        <p>Bombs: {bombAmount}</p>
        <img width="100px" src={getImgSrc(gameStatus)} />
        <p>Marks Used: {marksUsed}</p>
    </div>
}

const getImgSrc = (gameStatus: gameStatus) => {
    switch (gameStatus){
        case ("inprogress"): return "helthy.png";
        case ("won"): return "won.png";
        case ("lost"): return "ded.png";
    }
}