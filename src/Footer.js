import Box from '@mui/material/Box';
import Copyright from './Copyright';



export default function Footer() {
    return (

        <Box sx={{ display: 'flex', position: 'relative', mt:"10px"}}>
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    py: 1.5,
                    backgroundColor: "#c2c2c2",
                    
                }}
            >
                <Copyright />
            </Box>
        </Box>
    );
}