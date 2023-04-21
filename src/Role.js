import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Role() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                    labelId="role"
                    id="role"
                    value={age}
                    label="Role"
                    onChange={handleChange}
                >
                    <MenuItem value={'Host'}>Host</MenuItem>
                    <MenuItem value={'Tenant'}>Tenant</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}