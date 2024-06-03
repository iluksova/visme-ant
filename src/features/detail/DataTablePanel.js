import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {columns} from "./columns";
import React from "react";

export function DataTablePanel(props) {
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