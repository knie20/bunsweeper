"use client"
import { useSearchParams } from "next/navigation"
import AppHeader from "../../components/AppHeader";
import Game from "../../components/Game";

export default function Page() {
    const prams = useSearchParams();

    const boardLength = prams.get('length');
    const boardWidth = prams.get('width');
    const bombAmount = prams.get('bombs');

    return <>
        <AppHeader />
        <Game />
    </>
}
