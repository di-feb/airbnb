import React from 'react';
import HostNavbar from './HostNavbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Divider, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "./css/style.css";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
dayjs.extend(duration);

export default function HostHome() {
    const buttonStyles = {
        width: '140px',
        height: '30px',
        borderRadius: '25px',
        borderColor: 'black',
        textTransform: 'none',
        fontSize: '11px',
        color: 'black',
        '&:hover': {
          color: 'black',
          backgroundColor: '#dedede',
          borderColor: 'black',
        },
      };
      
    const checkingOut = 5;
    const currentlyHosting = 5;
    const arrivingSoon = 5;
    const Upcoming = 10;

    return (
        <>
            <HostNavbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 7, ml: 30, alignItems: 'left', width: '800px' }}>
                <Typography fontSize={25} fontWeight={600} sx={{ color: '#222222', mb: 6 }}>
                    Welcome, Stathis!
                </Typography>
                <Typography fontSize={22} fontWeight={400} sx={{ color: '#222222', mb: 2 }}>
                    Your reservations.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button variant='outlined' sx={buttonStyles}>
                        Checking Out({checkingOut})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles}>
                        Currently hosting({currentlyHosting})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles}>
                        Arriving soon({arrivingSoon})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles}>
                        Upcoming({Upcoming})
                    </Button>
                </Box>
            </Box >

        </>
    )

}