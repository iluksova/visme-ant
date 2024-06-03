import React from "react";
import {Box} from "@mui/material";
import ReactEcharts from "echarts-for-react";

export function ChartPanel(props) {
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
                        "<b>" + params.name + "</b>: " + params.value
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