import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import CollectionsIcon from '@mui/icons-material/Collections';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import FenceOutlinedIcon from '@mui/icons-material/FenceOutlined';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import ProgressBar from './ProgressBar';
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Copyright from './Copyright';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
dayjs.extend(duration);

export default function ContactHost(props) {

    const history = useNavigate();

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 30 }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '22px',
                        height: '35px',
                        alignItems: 'center',
                        borderRadius: '50px',

                        '&:hover': {
                            backgroundColor: '#dedede',
                            borderColor: 'black',
                        },
                    }}
                >
                    <ArrowBackIosIcon
                        onClick={() => history(-1)}
                        sx={{
                            height: '22px',
                            cursor: 'pointer',
                            ml: 0.5
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography fontSize='21px' sx={{ mt: 2 }} > Contact Valia </Typography>
                        <Typography fontSize='14px' sx={{ color: '#979797' }} > Typically responds within an hour </Typography>
                    </Box>
                    <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} sx={{ ml: 36, width: '50px', height: '50px' }} />
                </Box>

                <Divider sx={{ borderColor: '#606060', mt: 4, width: '550px' }} />

                <Typography fontSize='20px' sx={{ mt: 3 }} > Most travelers ask about </Typography>
                <Typography fontSize='14px' sx={{ mt: 3 }} > Getting There </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    Check-in for this home is between 3:00 PM and 2:00 AM (next day) and checkout is at 11:00 AM.
                </Typography>

            </Box>
        </>
    )
}