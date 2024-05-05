import React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {AppBar, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import Container from '@mui/material/Container';
import Options from "./features/options/Options";

const defaultTheme = createTheme();

function Dashboard() {
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
                height: '200vh',
                overflow: 'auto',
            }}
                 component="main">
                <Options/>
            </Box>
        </Box>
    </ThemeProvider>);
}


export default Dashboard;
