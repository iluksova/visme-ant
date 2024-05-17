import React, {useState, useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import {useSelector, useDispatch} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {transformation, visualization} from '../options/optionsSlice';
import {transformations} from "../data/dataSlice";

export function MainChart() {

    const selectedTransformation = useSelector(transformation);
    const selectedVisualization = useSelector(visualization);
    const transformationsData = useSelector(transformations);

    const gridSize = 10
    const chartSize = 1300

    const ranges = (data) => {
        const xMin = data.reduce((prev, curr) => prev[0] < curr[0] ? prev : curr)[0];
        const xMax = data.reduce((prev, curr) => prev[0] > curr[0] ? prev : curr)[0];
        const yMin = data.reduce((prev, curr) => prev[1] < curr[1] ? prev : curr)[1];
        const yMax = data.reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[1];
        return [xMin, xMax, yMin, yMax]
    }
    const facesGrid = (data, dataRanges) => {
        // find the min and max values
        let [xMin, xMax, yMin, yMax] = dataRanges

        const stepX = (xMax - xMin) / gridSize;
        const stepY = (yMax - yMin) / gridSize;

        let grid = [];
        let currX = xMin;
        let currY = yMin;
        // for each grid cells, find respective items and select one representative along with the items count
        for (let i = 0; i < gridSize; i++) {
            currX = xMin + i * stepX
            for (let j = 0; j < gridSize; j++) {
                currY = yMin + j * stepY
                const cellData = data.filter((item) => item[0] >= currX && item[0] < (currX + stepX) && item[1] >= currY && item[1] < currY + stepY);
                if (cellData.length > 0) {
                    //let cellRepresentative = cellData[Math.floor(Math.random() * cellData.length)];
                    // select first to enable caching
                    let cellRepresentative = cellData[0];
                    grid.push([cellRepresentative['id'], currX, currY, cellData.length])

                }

            }

        }
        return grid;
    }

    const renderFace = function (param, api) {
        const point = api.coord([
            api.value(1),
            api.value(2)
        ]);
        const imgSize = Math.floor(chartSize/(gridSize*1.6))
        return {
            type: 'group',
            children: [
                {
                    type: 'image',
                    style: {
                        image: 'data/rrsm/visualizations/faces/1/' + api.value(0) + '.png',
                        x: -imgSize/4,
                        y: -imgSize/2,
                        width: imgSize,
                        height: imgSize
                    },
                    position: point
                },
                {
                    type: 'text',
                    style: {
                        text: api.value(3),
                        textFont: api.font({fontSize: 14}),
                        textAlign: 'center',
                        textVerticalAlign: 'bottom'
                    },
                    position: [point[0] - imgSize/5, point[1] - imgSize/3]
                }
            ]
        };
    };


    const getOptions = () => {
        const data = transformationsData[selectedTransformation]
        const [xMin, xMax, yMin, yMax] = ranges(data)
        if (selectedVisualization === 'scatter') {
            return {
                xAxis: {
                    show: true,
                    scale: true,
                    min: Math.round(xMin * 120) / 100,
                    max: Math.round(xMax * 120) / 100,
                },
                yAxis: {
                    show: true,
                    scale: true,
                    min: Math.round(yMin * 120) / 100,
                    max: Math.round(yMax * 120) / 100,
                },
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
                symbolSize: 10,
                symbol: 'circle',
                series: [{
                    type: 'scatter',
                    data: Object.values(data).map((item) => {
                        return {
                            name: item['id'],
                            value: [item['0'], item['1']],
                        };
                    })
                }]
            };
        } else {
            return {
                grid: {show: true},
                xAxis: {
                    show: true,
                    scale: true,
                    axisLine: { show: false },
                    splitLine: { show: false },
                },
                yAxis: {
                    show: true,
                    scale: true,
                    axisLine: { show: false },
                    splitLine: { show: false },
                },
                animation: false,
                tooltip: {
                    show: false,
                },
                series: [{
                    type: 'custom',
                    data: facesGrid(data, [xMin, xMax, yMin, yMax]),
                    encode: {
                        x: 1,
                        y: 2
                    },
                    renderItem: renderFace,
                }]
            };
        }
    };

    if (!transformationsData)
        return <CircularProgress/>
    return <div style={{width: chartSize, height: chartSize, marginTop: '50px',}}>
        <ReactEcharts className="MainChart" style={{width: '100%', height: '100%'}}
                      option={getOptions()} /*onEvents={events} *//>;
    </div>

}