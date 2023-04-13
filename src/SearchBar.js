import React from 'react';
import { Box } from '@mui/material';
import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function SearchBar() {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState({
        id: 0,
        flag: false
    });

    return (
        <>
            {!openMenu &&
                <Box sx={{ flexGrow: 1, display: { xs: 'center', md: 'flex' } }}>
                    <Button    
                        variant="outlined"
                        sx={{
                            borderRadius: '40px',
                            backgroundColor: 'white',
                            borderWidth: '1px',
                            borderColor: '#606060',
                            borderStyle: 'solid',

                            transition: 'all 0.1s ease',
                            minWidth: '250px',
                            textTransform: 'none',

                            '&:hover': {
                                backgroundColor: 'white',
                                borderColor: 'black',
                                borderWidth: '2px',
                            },

                        }}
                        onClick={() => setOpenMenu(true)}
                        endIcon={ // icon goes to the right side of the button
                            <SearchIcon
                                sx={{
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    color: 'white',
                                }}
                            />
                        }
                    >

                        <Typography color="grey" fontWeight={openMenu && '600'} >
                            Search for accomondation
                        </Typography>

                    </Button >
                </Box >}

            {openMenu &&

                <Box sx={{
                    mr: '200px',
                    ml: '80px',
                    flexGrow: 2,
                    display: { xs: 'center', md: 'flex' },
                    borderRadius: '40px',
                    backgroundColor: isClicked.flag ? '#c2c2c2' :'white',
                    borderWidth: '3px',
                    borderColor: '#606060',
                    borderStyle: 'solid',

                    transition: 'all 0.1s ease',
                    height: '60px',

                    '&:hover': {
                        backgroundColor: isClicked.flag ? '#c2c2c2' :'white',
                        borderColor: 'black',
                        borderWidth: '3px',
                    },

                }}
                >


                    <Button id="1"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isClicked.id === 1 && 'white', 
                            boxShadow: isClicked.id === 1 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 1 ? 'white' : 'grey' },
                            
                        }}
                        onClick={()=> setIsClicked({id: 1, flag: true})}
                    >
                        <Typography
                            color="black"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                mb: '5px', // Adds margin bottom of 5px
                                
                            }}
                        >
                            Where
                        </Typography>

                        <Typography
                            color="black"
                            sx={{
                                fontSize: '11px',
                                textAlign: 'center',
                            }}
                        >
                            Destination search
                        </Typography>
                    </Button>
                   

                    <Button id="2"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isClicked.id === 2 && 'white', 
                            boxShadow: isClicked.id === 2 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 2 ? 'white' : 'grey' },
                        }}
                        onClick={()=> setIsClicked({id: 2, flag: true})}
                    >
                        <Typography
                            color="black"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                mb: '5px', // Adds margin bottom of 5px
                            }}
                        >
                            Check In
                        </Typography>

                        <Typography
                            color="black"
                            sx={{
                                fontSize: '11px',
                                textAlign: 'center',
                            }}
                        >
                            Add dates
                        </Typography>
                    </Button>
                    <Button id="3"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isClicked.id === 3 && 'white', 
                            boxShadow: isClicked.id === 3 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 3 ? 'white' : 'grey' },
                        }}
                        onClick={()=> setIsClicked({id: 3, flag: true})}
                    >
                        <Typography
                            color="black"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                mb: '5px', // Adds margin bottom of 5px
                            }}
                        >
                            Check Out
                        </Typography>

                        <Typography
                            color="black"
                            sx={{
                                fontSize: '11px',
                                textAlign: 'center',
                            }}
                        >
                            Add dates
                        </Typography>
                    </Button>
                    <Button id="4"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isClicked.id === 4 && 'white',
                            boxShadow: isClicked.id === 4 && '0px 8px 12px rgba(0, 0, 0, 0.4)', 
                            '&:hover': { backgroundColor: isClicked.id === 3 ? 'white' : 'grey' },
                        }}
                        onClick={() => setIsClicked({id: 4, flag: true})}
                    >
                        <Typography
                            color="black"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                mb: '5px', // Adds margin bottom of 5px
                            }}
                        >
                            Who
                        </Typography>

                        <Typography
                            color="black"
                            sx={{
                                fontSize: '11px',
                                textAlign: 'center',
                            }}
                        >
                            Add guests
                        </Typography>
                    </Button>
                    <Button sx={{
                        minWidth: '20%',
                        borderRadius: '30px',
                        backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',


                    }}
                        endIcon={<SearchIcon sx={{ color: 'white' }} />}
                    >
                        <Typography color="white" fontWeight='600'>
                            Search
                        </Typography>
                    </Button>

                </Box >
            }
        </>
    )
}