import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import ReserveCard from './ReserveCard';
dayjs.extend(duration);

export default function ContactHost() {

    const [question, setQuestion] = React.useState('');
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
                <Typography fontSize='14px' sx={{ mt: 3 }} > House details and rules </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    No pets.
                </Typography>

                <Typography fontSize='14px' sx={{ mt: 3 }} > Price and availability </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    Maria’s home is available from Oct 17 – 22. Book soon.
                </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4, width: '500px' }} >
                    Cancel up to 5 days before check-in and get a full refund.
                    After that, cancel before check-in and get a 50% refund,
                    minus the first night and service fee.
                </Typography>

                <Divider sx={{ borderColor: '#606060', mt: 4, width: '550px' }} />

                <Typography fontSize='20px' sx={{ mt: 3 }} > Still have questions? Message the Host </Typography>

                <TextField
                    multiline
                    value={question}
                    onChange={(event) => {
                        setQuestion(event.target.value);
                    }}
                    sx={{
                        width: '500px',
                        mt: 1,
                        mb: 2.5,
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },

                    }}
                />

                <Button
                    variant='outlined'
                    sx={{
                        width: '130px',
                        textTransform: 'none',
                        bgcolor: 'white',
                        borderColor: 'black',
                        color: 'black',
                        borderRadius: '7px',
                        fontSize:'13px',
                        fontWeight:'bold',
                        mb:10,

                        '&:hover': {
                            color: 'black',
                            backgroundColor: '#dedede',
                            borderColor: 'black',
                        },

                    }}
                >
                    Send Message
                </Button>
                
                <ReserveCard
                    price='500'
                    airbnbFee='500'
                    rating="5.0"
                    reviews='10'
                    position='absolute'
                    top='150px'
                />
            </Box>        
            
        </>
    )
}