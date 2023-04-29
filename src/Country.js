import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import listOfCountries from './countries'
import { TextField } from '@mui/material';
import { Box } from '@mui/material';

export default function Country(props) {

    
    return (
        <Autocomplete
            id="country"
            value={props.value}
            onChange={props.onChange}
            
            sx={{
                width: 250,
                mt:'10px',
                ml:'20px',
                mr:'10px',
                zIndex:'9999',
                maxHeight: 100,
                "& .MuiInputBase-root": {
                    borderRadius: "50px !important",
                    width: "460px"
                },
            }}
            options={listOfCountries.countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 1 }}}
                    {...props}
                >
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField

                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill

                    }}
                />
            )}
        />
    )
}