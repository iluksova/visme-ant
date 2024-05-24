import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {useSelector} from "react-redux";
import {selectedItems, dataset} from "../data/dataSlice";
import {columns} from "./columns";
import ReactEcharts from "echarts-for-react";


function DataTablePanel(props) {
    const {data, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{paddingLeft: '0px'}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {/*{data.map(function (item) {*/}
                    {/*    return (<Typography>{item['id']}</Typography>)*/}
                    {/*})}*/}
                    <div style={{height: '100%', width: '100%'}}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 15},
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </Box>
            )}
        </div>
    );
}

function ChartPanel(props) {
    const {data, value, index, ...other} = props;

    const [itemsCount, setItemsCount] = React.useState(10);

    const getOptions = (title, xAxis, values) => {

        return {
            title: { text: title, },
            grid: {show: true, left: 40, top: 40, bottom: 40, right: 40, containLabel: true,},
            animation: false,
            tooltip: {
                show: true,
                position: 'top',
                formatter: function (params) {
                    return (
                        params.data.name
                    );
                }
            },
            xAxis: {
                type: 'category',
                data: xAxis,
                axisLabel: {
                    show: true,
                    rotate: 90,
                },
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                data: values
            }]
        };
    }

    function omit(key, obj) {
        const {[key]: omitted, ...rest} = obj;
        return rest;
    }

    const maxItems = Math.min(itemsCount, data.length);
    const chartData = [];
    for (let i = 0; i < maxItems; i++) {
        const dataItem = { ...data[i] };
        let dataItemCropped = omit('id', dataItem);
        ['Date_MRI_exam','VekPriVys','VekPriPocNemoci','TrvaniNemPriVys','MedullaC3C4_SV_cm3$','WMabnormal_FS_cm3','CSF_cm3_Morphobox','GM_cm3_Morphobox','WM_cm3_Morphobox','TIV_cm3_Morphobox'].forEach((item) =>
            dataItemCropped = omit(item, dataItemCropped)
        );

        chartData.push([dataItem.id, Object.keys(dataItemCropped).map(item => item.replace('_proc_Morphobox', '').replace('proc_Morphobox', '')), Object.values(dataItemCropped)]);
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{paddingLeft: '0px'}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {/*{data.map(function (item) {*/}
                    {/*    return (<Typography>{item['id']}</Typography>)*/}
                    {/*})}*/}
                    {chartData.map(function (item) {
                        return (<ReactEcharts
                            className="SmallChart"
                            style={{width: '100%', height: '300px'}}
                            option={getOptions(item[0], item[1], item[2])}
                        />)
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
            mt: '10px',
            pl: '10px',
            pt: '10px'
        }}>
            <Tabs value={value} onChange={handleChange} aria-label="Detial panel">
                <Tab label="Data"/>
                <Tab label="Charts"/>
            </Tabs>
        </Box>

        <DataTablePanel value={value} index={0} data={items}/>
        <ChartPanel value={value} index={1} data={items}/>
    </div>

};

