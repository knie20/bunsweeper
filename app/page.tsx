"use client"
import { Box, Button, Container, Input, Stack, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import React from 'react'
import NumberInput from './components/NumberInput'
import AppHeader from './components/AppHeader'
import { ClassNames } from '@emotion/react'

export default function Page() {


        return (
        <div className='container mx-auto content-center'>
            <AppHeader></AppHeader>
            <Card raised className='container px-5 py-5'>
                <Stack component='form'>
                    <NumberInput label='Board Length' value={10}></NumberInput>
                    <NumberInput label='Board Width' value={10}></NumberInput>
                    <NumberInput label='Bombs' value={10}></NumberInput>
                </Stack>
            </Card>
        </div>
        )
}