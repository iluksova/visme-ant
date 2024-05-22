import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {selectedItems, dataset} from "../data/dataSlice";


function DataTablePanel(props) {
    const {data, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {data.map(function (item) {
                        return (<Typography>{item['id']}</Typography>)
                    })}
                </Box>
            )}
        </div>
    );
}


export function DetailPanel() {

    const items = useSelector(selectedItems);
    const data = useSelector(dataset);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return <div style={{width: '100%'}}>
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '90%',
            mt: '70px',
            pl: '10px',
            pt: '10px'
        }}>
            <Tabs value={value} onChange={handleChange} aria-label="Detial panel">
                <Tab label="Data"/>
                <Tab label="Charts"/>
            </Tabs>
        </Box>

        <DataTablePanel value={value} index={0} data={items}/>


    </div>

};