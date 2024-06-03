import React from "react";
import {Box} from "@mui/material";
import ReactEcharts from "echarts-for-react";
import {ceil, mean, std, max, round} from "mathjs";


export function GroupPanel(props) {
    const {data, dataset, value, index, ...other} = props;

    const getChartData = (plottedColumns) => {
        const datasetColumns = [];
        plottedColumns.forEach(column =>
            datasetColumns.push(dataset.map(item => item[column]))
        )
        const selectedDataColumns = [];
        plottedColumns.forEach(column =>
            selectedDataColumns.push(data.map(item => item[column]))
        )

        const dataMeans = datasetColumns.map(column => mean(column));
        const dataMaxStd = ceil(max(datasetColumns.map(column => std(column))));
        const selectedDataStds = round(selectedDataColumns.map(column => std(column)), 4);
        const selectedDataMeans = round(selectedDataColumns.map(column => mean(column)), 4);

        const selectedDataMeanDiff = round(selectedDataMeans.map((x, i) => x - dataMeans[i]), 4);
        return [selectedDataMeans, selectedDataStds, selectedDataMeanDiff, dataMaxStd];


    };

    const getOptions = (title, xAxis, yAxisMin, yAxisMax, values) => {

        return {
            title: {text: title,},
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
                type: 'value',
                max: yAxisMax,
                min: yAxisMin
            },
            series: [{
                type: 'bar',
                data: values
            }]
        };
    }

    const chartData = [];
    if (data.length > 0) {
        const plottedColumns = Object.keys(data[0]);
        plottedColumns.splice(0, 11);
        const [selectedDataMeans, selectedDataStds, selectedDataMeanDiff, maxStd] = getChartData(plottedColumns)

        const columnNames = plottedColumns.map(item => item.replace('_proc_Morphobox', '').replace('proc_Morphobox', ''));


        chartData.push(["Group mean", columnNames, 0, 100, selectedDataMeans]);
        chartData.push(["Group standard deviation", columnNames, 0, maxStd, selectedDataStds]);
        chartData.push(["Difference between group and dataset mean", columnNames, -100, 100, selectedDataMeanDiff]);
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
                    {chartData.map(function (item, idx) {
                        return (<ReactEcharts
                            key={idx}
                            className="SmallChart"
                            style={{width: '100%', height: '300px'}}
                            option={getOptions(item[0], item[1], item[2], item[3], item[4])}
                        />)
                    })}


                </Box>
            )}
        </div>
    );
}