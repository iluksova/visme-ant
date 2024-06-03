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
    const results = Papa.parse(csv, {header: true, dynamicTyping: true, skipEmptyLines: true}) // object with { data, errors, meta }
    return results.data
}

function parseCsvPath(path) {
    let data = [];
    Papa.parse(path, {
        header: true, dynamicTyping: true, download: true, complete: function (results) {
            data = results.data;
        }
    }) // object with { data, errors, meta }
    return data;
}

function Dashboard() {

    const dataPath = 'data/rrsm/data.csv';
    const phateTransformationPath = 'data/rrsm/2d/phate.csv';
    const pcaTransformationPath = 'data/rrsm/2d/pca.csv';
    const tsne5TransformationPath = 'data/rrsm/2d/tsne_p5.csv';
    const tsne30TransformationPath = 'data/rrsm/2d/tsne_p30.csv';
    const tsne50TransformationPath = 'data/rrsm/2d/tsne_p50.csv';
    const tsne100TransformationPath = 'data/rrsm/2d/tsne_p100.csv';


    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            // const response = await fetch(dataPath)
            // const reader = response.body.getReader()
            // const dataset = parseCsv(await reader.read())
            //const dataset = parseCsvPath(dataPath)

            Papa.parse(dataPath, {
                header: true, skipEmptyLines: true, dynamicTyping: true, download: true, complete: function (results) {
                    dispatch(dataLoaded(results.data))
                }
            })
            //dispatch(dataLoaded(dataset))
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

            const tsne5Response = await fetch(tsne5TransformationPath)
            const tsne5Reader = tsne5Response.body.getReader()
            const tsne5Result = parseCsv(await tsne5Reader.read()) // raw array

            const tsne30Response = await fetch(tsne30TransformationPath)
            const tsne30Reader = tsne30Response.body.getReader()
            const tsne30Result = parseCsv(await tsne30Reader.read()) // raw array

            const tsne50Response = await fetch(tsne50TransformationPath)
            const tsne50Reader = tsne50Response.body.getReader()
            const tsne50Result = parseCsv(await tsne50Reader.read()) // raw array


            // array of objects
            dispatch(transformationsLoaded({
                'phate': phateResult,
                'pca': pcaResult,
                'tsne5': tsne5Result,
                'tsne30': tsne30Result,
                'tsne50': tsne50Result,
            }))
        }

        loadTransformations()
    }, [dispatch])


    return (<ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute">
                <Toolbar
                    sx={{
                        pr: '10px', // keep right padding when options closed
                    }}
                >
                    <img src={ant} style={{
                        height: '45px',
                        marginRight: '10px',
                        pointerEvents: 'none',
                        transform: 'rotate(0.10turn)'
                    }} alt="logo"/>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        VISAnt
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
