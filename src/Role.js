import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Role() {
    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                    id="role"
                    name='role'
                    labelId="role"
                    value={role}
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