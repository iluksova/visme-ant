import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {useSelector} from "react-redux";
import {selectedItems, dataset} from "../data/dataSlice";
import {visualization} from '../options/optionsSlice';
import {GroupPanel} from "./GroupPanel";
import {DataTablePanel} from "./DataTablePanel";
import {ChartPanel} from "./ChartPanel";


export function DetailPanel() {

    const items = useSelector(selectedItems);
    const data = useSelector(dataset);
    const selectedVisualization = useSelector(visualization);

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (selectedVisualization === 'faces') {
            setValue(0);
        } else {
            setValue(1);
        }
    }, [selectedVisualization]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    return <div style={{width: '100%'}}>
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '90%',
            mt: '10px',
            pl: '10px',
            pt: '10px'
        }}>
            <Tabs value={value} onChange={handleChange} aria-label="Detial panel">
                {selectedVisualization === 'faces' && (
                    <Tab label="Group" value={0}/>)
                }
                <Tab label="Data" value={1}/>
                <Tab label="Charts" value={2}/>
            </Tabs>
        </Box>

        <GroupPanel value={value} index={0} data={items} dataset={data}/>
        <DataTablePanel value={value} index={1} data={items}/>
        <ChartPanel value={value} index={2} data={items}/>
    </div>

};

