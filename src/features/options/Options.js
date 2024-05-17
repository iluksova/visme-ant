import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectTransformation,
    selectVisualization,
    transformation,
    visualization
} from './optionsSlice';
import {styled} from "@mui/material/styles";
import {Divider, Stack, Toolbar} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const optionsWidth = 240;


// const StyledOptions = styled(Stack, {shouldForwardProp: (prop) => prop})(
//     ({theme}) => ({
//         // '& .MuiDrawer-paper': {
//         //     position: 'relative',
//         //     whiteSpace: 'nowrap',
//         //     width: optionsWidth,
//         //     boxSizing: 'border-box'
//         // },
//     }),
// );

function Options() {

    const selectedTransformation = useSelector(transformation);
    const selectedVisualization = useSelector(visualization);
    const dispatch = useDispatch();


    const handleChangeTransformation = (event) => {
        dispatch(selectTransformation(event.target.value));
    };

    const handleChangeVisualization = (event) => {
        dispatch(selectVisualization(event.target.value));
    };

    return (
        <Stack sx={{
            width: '80%',
            mt: '70px',
            pl: '10px',
            pt: '10px'
        }}>
            <FormControl fullWidth>
                <InputLabel id="2d-method-select-label">Transformation</InputLabel>
                <Select
                    labelId="2d-method-select-label"
                    id="2d-method-select"
                    value={selectedTransformation}
                    label="Transformation"
                    onChange={handleChangeTransformation}
                >
                    <MenuItem value={'pca'}>PCA</MenuItem>
                    <MenuItem value={'phate'}>Phate</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                fullWidth
                style={{ marginTop: '20px' }}
            >
                <InputLabel id="visualization-select-label">Visualization</InputLabel>
                <Select
                    labelId="visualization-select-label"
                    id="visualization-select"
                    value={selectedVisualization}
                    label="Transformation"
                    onChange={handleChangeVisualization}
                >
                    <MenuItem value={'scatter'}>Scatter</MenuItem>
                    <MenuItem value={'faces'}>Faces</MenuItem>
                </Select>
            </FormControl>

        </Stack>)
}


Options.displayName = 'Options'

export default Options;