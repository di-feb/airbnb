import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export default function DateCalendarValue(props) {
    const now = new Date(Date.now());
    const today = dayjs(new Date())
    const nextMonth = dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 1))
    const [value, setValue] = React.useState(props.checkIn ? today : nextMonth);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} minDate={today} />
        </LocalizationProvider>
    );
}