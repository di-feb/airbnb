import React from 'react';
import HostNavbar from './HostNavbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import Footer from './Footer';

export default function HostHome() {
    const checkingOut = 0;
    const currentlyHosting = 0;
    const arrivingSoon = 0;
    const upcoming = 0;
    const reservations = 0;

    const [hostButtons, setHostButtons] = React.useState(1);

    function handleButtons(buttonNum) {
        if (buttonNum === 1)
            setHostButtons(1)
        else if (buttonNum === 2)
            setHostButtons(2)
        else if (buttonNum === 3)
            setHostButtons(3)
        else
            setHostButtons(4)
    }

    const buttonMessage = function () {
        if (hostButtons === 1 && checkingOut === 0)
            return "You don’t have any guests checking out today or tomorrow."
        else if (hostButtons === 2 && currentlyHosting === 0)
            return "You don’t have any guests staying with you right now."
        else if (hostButtons === 3 && arrivingSoon === 0)
            return "You don’t have any guests arriving today or tomorrow."
        else if (hostButtons === 4 && upcoming === 0)
            return "You currently don’t have any upcoming guests."

    }
    
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
    const buttonStyles1 = {
        ...buttonStyles,
        borderWidth: hostButtons === 1 && '2px',
        '&:hover': {
            color: 'black',
            backgroundColor: hostButtons === 1 ? 'white' :'#dedede',
            borderWidth: hostButtons === 1 && '2px',
            borderColor: 'black', 
        },
      };
      
      const buttonStyles2 = {
        ...buttonStyles,
        borderWidth: hostButtons === 2 && '2px',
        '&:hover': {
            color: 'black',
            backgroundColor: hostButtons === 2 ? 'white' :'#dedede',
            borderWidth: hostButtons === 2 && '2px',
            borderColor: 'black', 
        },
      };

      const buttonStyles3 = {
        ...buttonStyles,
        borderWidth: hostButtons === 3 && '2px',
        '&:hover': {
            color: 'black',
            backgroundColor: hostButtons === 3 ? 'white' :'#dedede',
            borderWidth: hostButtons === 3 && '2px',
            borderColor: 'black', 
        },
      };

      const buttonStyles4 = {
        ...buttonStyles,
        borderWidth: hostButtons === 4 && '2px',
        '&:hover': {
            color: 'black',
            backgroundColor: hostButtons === 4 ? 'white' :'#dedede',
            borderWidth: hostButtons === 4  && '2px',
            borderColor: 'black', 
        },
      };


    return (
        <>
            <HostNavbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 7, ml: 30, alignItems: 'left', width: '1000px' }}>
                <Typography fontSize={25} fontWeight={600} sx={{ color: '#222222', mb: 6 }}>
                    Welcome, Stathis!
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <Typography fontSize={22} fontWeight={400} sx={{ color: '#222222' }}>
                        Your reservations.
                    </Typography>
                    <Button variant='text'
                        sx={{
                            width: '180px',
                            height: '30px',
                            borderRadius: '10px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#dedede',
                            },
                        }}>

                        <Typography fontSize={13} fontWeight={600} sx={{ color: '#222222', textDecoration: 'underline' }}>
                            All reservations ({reservations})
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '700px' }}>
                    <Button variant='outlined' sx={buttonStyles1} onClick={() => handleButtons(1)} >
                        Checking Out ({checkingOut})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles2} onClick={() => handleButtons(2)}>
                        Currently hosting ({currentlyHosting})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles3} onClick={() => handleButtons(3)}>
                        Arriving soon ({arrivingSoon})
                    </Button>
                    <Button variant='outlined' sx={buttonStyles4} onClick={() => handleButtons(4)}>
                        Upcoming ({upcoming})
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', bgcolor: '#F0F0F0', width: '1000px', height: '200px', borderRadius: '12px', mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', bgcolor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <TaskOutlinedIcon sx={{ display: 'block', width: '32px', height: '32px' }} />
                        <Typography variant="paragraph" align="center" fontSize={11} sx={{ color: '#222', mt: 2, width: '150px' }}>
                            {buttonMessage()}
                        </Typography>
                    </Box>
                </Box>

            </Box >
            <Footer />
        </>
    )

}