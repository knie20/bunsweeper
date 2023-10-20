"use client"
import { useSearchParams } from "next/navigation"
import Game from "../../components/Game";

export default function Page() {
    const prams = useSearchParams();

    const boardLengthString = prams.get('length') ?? '';
    const boardWidthString = prams.get('width') ?? '';
    const bombAmountString = prams.get('bombs') ?? '';

    if(!boardLengthString || !boardWidthString || !bombAmountString)
        throw new Error("invalid params")

    const boardLength: number = +boardLengthString;
    const boardWidth: number = +boardWidthString;
    const bombAmount: number = +bombAmountString;

    return <div className="flex flex-col items-center">
        <Game length={boardLength} width={boardWidth} bombAmount={bombAmount}/>
    </div>
}
