import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { selectClasses } from '@mui/material';


export default function ListItems(props) {

    return (

        <React.Fragment>
            <ListItemButton
                onClick={() => props.setSelectedTable("Users")}
                sx={{
                    bgcolor: props.selectedTable === 'Users' ? '#c2c2c2' : 'transparent',
                    '&:hover': {
                        bgcolor: props.selectedTable === 'Users' ? '#c2c2c2' : 'transparent'
                    },

                }}
            >
                <ListItemIcon >
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.setSelectedTable("Hosts")}
                sx={{
                    bgcolor: props.selectedTable === 'Hosts' ? '#c2c2c2' : 'transparent',
                    '&:hover': {
                        bgcolor: props.selectedTable === 'Hosts' ? '#c2c2c2' : 'transparent'
                    },

                }}
            >
                <ListItemIcon>
                    <PersonIcon
                    />

                </ListItemIcon>
                <ListItemText primary="Hosts" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.setSelectedTable("Tenants")}
                sx={{
                    bgcolor: props.selectedTable === 'Tenants' ? '#c2c2c2' : 'transparent',
                    '&:hover': {
                        bgcolor: props.selectedTable === 'Tenants' ? '#c2c2c2' : 'transparent'
                    },

                }}
            >
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Tenants" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.setSelectedTable("Accommodations")}
                sx={{
                    bgcolor: props.selectedTable === 'Accommodations' ? '#c2c2c2' : 'transparent',
                    '&:hover': {
                        bgcolor: props.selectedTable === 'Accommodations' ? '#c2c2c2' : 'transparent'
                    },

                }}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Accommodations" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.setSelectedTable("Reviews")}
                sx={{
                    bgcolor: props.selectedTable === 'Reviews' ? '#c2c2c2' : 'transparent',
                    '&:hover': {
                        bgcolor: props.selectedTable === 'Reviews' ? '#c2c2c2' : 'transparent'
                    },

                }}
            >
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
            </ListItemButton>

        </React.Fragment>

    )
};
