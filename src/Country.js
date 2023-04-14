import Autocomplete from '@mui/material/Autocomplete';
import listOfCountries from './countries'
import { TextField } from '@mui/material';
import { Box } from '@mui/material';

export default function Country() {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{
                width: 250,                
                ml: '30px',
                mt: '10px',
                maxHeight: 100,
                "& .MuiInputBase-root": {
                    borderRadius: "50px !important",
                    width: "400px"
                },
            }}
            options={listOfCountries.countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li"
                    sx={{
                        '& > img': { mr: 2, flexShrink: 1 },
                        

                    }}
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