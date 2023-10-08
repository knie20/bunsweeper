"use client"
import { useSearchParams } from "next/navigation"
import AppHeader from "../../components/AppHeader";
import Game from "../../components/Game";
import { ClassNames } from "@emotion/react";

export default function Page() {
    const prams = useSearchParams();

    const boardLength = prams.get('length');
    const boardWidth = prams.get('width');
    const bombAmount = prams.get('bombs');

    return <div className="flex flex-col items-center">
        <AppHeader />
        <Game />
    </div>
}
