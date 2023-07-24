import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from './Logo';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Paper } from '@mui/material';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ClickAwayListener } from '@mui/material';


export default function HostNavbar(props) {

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

                                borderWidth: notifications ? '2.5px' : '1px',
                                borderStyle: 'solid',
                                borderColor: '#606060',
                                borderRadius: '50px',
                                bgcolor: 'white',

                                ml: 155,

                                '&:hover': {
                                    backgroundColor: '#dedede',
                                },
                            }}
                        >
                            <NotificationsNoneIcon
                                onClick={() => { setNotifications(prev => !prev); }}
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
                            onClick={() => {setProfile(prev => !prev) }}
                            sx={{
                                borderWidth: profile ? '2.5px' : '0px',
                                borderStyle: 'solid',
                                borderColor: '#606060',
                                borderRadius: '50px',
                                bgcolor: 'white',
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
                <ClickAwayListener onClickAway={() => setNotifications(false)}>
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
                            zIndex: 1000,
                        }}
                    >
                        <NotificationsNoneIcon
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
                </ClickAwayListener>
            }

            {
                profile &&
                <ClickAwayListener onClickAway={() => setProfile(false)}>

                    <Paper
                        sx={{
                            width: '270px',
                            position: 'absolute',
                            top: 80,
                            left: 1250,
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: 'black',
                            zIndex: 1000,

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
                </ClickAwayListener>

            }
        </>
    )
}