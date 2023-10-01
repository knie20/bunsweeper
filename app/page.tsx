"use client"
import { Box, Button, Container, Input, Stack, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import React, { useState } from 'react'
import NumberInput from '../components/NumberInput'
import AppHeader from '../components/AppHeader'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context'

export default function Page() {
        const router: AppRouterInstance = useRouter();
        const params = useSearchParams();
        const [boardLength, setboardLength] = useState(10);
        const [boardWidth, setboardWidth] = useState(10);
        const [bombAmount, setbombAmount] = useState(10);

        const updateBoardLength = (newLength: number) => {
            setboardLength(newLength);
        }

        const updateBoardWidth = (newWidth: number) => {
            setboardWidth(newWidth);
        }

        const updateBombAmount = (newBombAmount: number) => {
            setbombAmount(newBombAmount);
        }

        const handleStart = (l: number, w: number, b: number) => {
            router.replace(`/game?length=${boardLength}&width=${boardWidth}&bombs=${bombAmount}`);
        }

        return (
        <div className='container mx-auto content-center w-6/12'>
            <AppHeader></AppHeader>
            <Card raised className='container px-5 py-5'>
                <Stack component='form'>
                    <NumberInput label='Board Length' value={10} valueChangeHook={updateBoardLength}></NumberInput>
                    <NumberInput label='Board Width' value={10} valueChangeHook={updateBoardWidth}></NumberInput>
                    <NumberInput label='Bombs' value={10} valueChangeHook={updateBombAmount}></NumberInput>
                    <Button onClick={() => handleStart(boardLength, boardWidth, bombAmount)}>Start Sweeping</Button>
                </Stack>
            </Card>
        </div>
        )
}