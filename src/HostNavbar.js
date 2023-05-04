import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './Logo';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Paper } from '@mui/material';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function ReserveCard(props) {

    const [notifications, setNotifications] = React.useState(false)
    const [profile, setProfile] = React.useState(false)

    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }} position="static">
                <Container maxWidth="xxl">
                    <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <Logo />


                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '30px',
                                height: '30px',

                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'black',
                                borderRadius: '50px',
                                bgcolor: 'white',

                                mr: 4,

                                '&:hover': {
                                    backgroundColor: '#dedede',
                                },
                            }}
                        >
                            <NotificationsNoneIcon
                                onClick={() => { setNotifications(prev => !prev); setProfile(false); } }
                                sx={{
                                    color: 'black',
                                    height: '32px',
                                    cursor: 'pointer',

                                }}
                            />
                        </Box>

                        <Avatar
                            alt="MyProfile"
                            src={require("./images/avatar.png")}
                            onClick={() => setNotifications(false)}
                            sx={{
                                width: '35px', 
                                height: '35px',
                                cursor: 'pointer',
                            }}
                        />

                    </Toolbar>
                </Container>
            </AppBar>

            {
                notifications &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '270px',
                        height: '500px',

                        borderWidth: '1px',
                        borderColor: 'black',
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        bgcolor: 'white',

                        position: 'absolute',
                        top: 80,
                        left: 1200,
                    }}
                >
                    <NotificationsNoneIcon
                        size
                        sx={{
                            color: 'black',
                            minHeight: '38px',
                            minWidth: '38px',
                            cursor: 'pointer',
                            mb: 2,
                        }}
                    />
                    <Typography>
                        No notifications yet!
                    </Typography>
                    <Typography variant="paragraph" align="center" fontSize={12} sx={{ color: 'grey', mt: 2 }}>
                        You've got a blank slate (for now). We'll let you know when updates arrive!
                    </Typography>
                </Box >
            }

            {
                profile &&

                <Paper
                    sx={{
                        width: '270px',
                        position: 'absolute',
                        top: 80,
                        left: 1250,
                    }}
                >
                    <MenuList dense>
                        <MenuItem>
                            <ListItemText >Profile</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText >Account</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText >Get Help</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem>
                            <ListItemText>Language and tranlsation</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>EUR</ListItemText>
                        </MenuItem>

                        <Divider />
                        <MenuItem>
                            <ListItemText>Switch to travaling</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>Log Out</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>

            }
        </>
    )
}