import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';


export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accomondations" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
        </ListItemButton>
    </React.Fragment>
);
