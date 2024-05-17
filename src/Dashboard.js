import React, {useEffect} from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';

import './App.css';
import {AppBar, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import Papa from 'papaparse'

import Options from "./features/options/Options";
import {useDispatch} from "react-redux";
import {dataLoaded, transformationsLoaded} from "./features/data/dataSlice";
import {MainChart} from "./features/chart/MainChart";


const defaultTheme = createTheme();

function parseCsv(result) {
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true, dynamicTyping: true }) // object with { data, errors, meta }
    return results.data
}

function Dashboard() {

    const dataPath = 'data/rrsm/data.csv';
    const phateTransformationPath = 'data/rrsm/2d/phate.csv';
    const pcaTransformationPath = 'data/rrsm/2d/pca.csv';


    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            const response = await fetch(dataPath)
            const reader = response.body.getReader()
            const dataset = parseCsv(await reader.read())
            dispatch(dataLoaded(dataset))
        }
        loadData()
    }, [dispatch])

    useEffect(() => {
        async function loadTransformations() {
            const phateResponse = await fetch(phateTransformationPath)
            const phateReader = phateResponse.body.getReader()
            const phateResult = parseCsv(await phateReader.read()) // raw array

            const pcaResponse = await fetch(pcaTransformationPath)
            const pcaReader = pcaResponse.body.getReader()
            const pcaResult = parseCsv(await pcaReader.read()) // raw array

             // array of objects
            dispatch(transformationsLoaded({'phate': phateResult, 'pca': pcaResult}))
        }
        loadTransformations()
    }, [dispatch])


    return (<ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute">
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when options closed
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        VismeAnt
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                flex: '0 0 25em',
                overflow: 'auto',
            }}
                 component="main">
                <Options/>
            </Box>
            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                height: '100vh',
                width: '30vh',
                overflow: 'auto',
            }}
                 component="main">
                <MainChart/>
            </Box>
        </Box>
    </ThemeProvider>);
}


export default Dashboard;
