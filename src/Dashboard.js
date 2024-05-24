import React, {useEffect} from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';

import './App.css';
import {AppBar, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import Papa from 'papaparse'

import Options from "./features/options/Options";
import {useDispatch} from "react-redux";
import {dataLoaded, transformationsLoaded} from "./features/data/dataSlice";
import {MainChart} from "./features/chart/MainChart";
import {DetailPanel} from "./features/detail/DetailPanel";
import ant from "./ant.svg";


const defaultTheme = createTheme();

function parseCsv(result) {
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, {header: true, dynamicTyping: true}) // object with { data, errors, meta }
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
                    <img src={ant} style={{  height: '50px', marginRight: '15px', pointerEvents: 'none'}} alt="logo" />
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
                flex: '0 0 15em',
                overflow: 'auto',
            }}
                 component="div">
                <Options/>
            </Box>
            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                height: '1150px',
                width: '100%',
                mt: '70px',
                overflow: 'hidden'
            }}
                 component="div">
                <Box sx={{
                    display: 'flex',
                    flexGrow: 0,
                    height: '100%',
                    width: '1200px',
                }}
                     component="div">
                    <MainChart/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    flexGrow: 1,
                    flex: '1 0 ',
                    overflow: 'auto',
                }}
                     component="div">
                    <DetailPanel/>
                </Box>
            </Box>
        </Box>
    </ThemeProvider>);
}


export default Dashboard;
