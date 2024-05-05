import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectTransformation,
    transformation,
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
    const dispatch = useDispatch();


    const handleChange = (event) => {
        dispatch(selectTransformation(event.target.value));
    };

    return (
        <Stack sx={{
            width: '15%',
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
                    onChange={handleChange}
                >
                    <MenuItem value={'pca'}>PCA</MenuItem>
                    <MenuItem value={'phate'}>Phate</MenuItem>
                </Select>
            </FormControl>

        </Stack>)
}


Options.displayName = 'Options'

export default Options;