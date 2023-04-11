import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import { Typography } from '@mui/material';


export default function Footer() {
    return (

        <Box sx={{ display: 'flex', position: 'relative'}}>
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    py: 2.5,
                    
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[400]
                            : theme.palette.grey[800],
                }}
            >
                <Copyright />
            </Box>
        </Box>
    );
}