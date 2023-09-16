import React from 'react';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DatePicker(props) {

    return (
        <Box sx={{
            display: 'flex',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '650px',
            height: '320px',
            borderRadius: '30px',
            backgroundColor: 'white',
            boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
            zIndex: '2',

        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={props.data.checkIn} onChange={(newValue) => props.setData({ ...props.data, checkIn: newValue })} minDate={props.today} />
                <DateCalendar value={props.data.checkOut} onChange={(newValue) => props.setData({ ...props.data, checkOut: newValue })} minDate={props.today} />
            </LocalizationProvider>
        </Box>
    )
}
