import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="20vh"

        >
            <img
                alt='stich drawing (fun picrure for loading!)'
                loading="lazy"
                src={require('./images/stitch.png')}
                width='400px'
                height='500px'
                style={{ position: 'absolute', borderRadius: '10%', top: '50%', transform: 'translateY(-50%)' }}
            >
            </img>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                zIndex='2'
            >
                <Typography fontSize={20}>
                    The page is still loading...
                </Typography>
                <CircularProgress sx={{ maxWidth: '30px', maxHeight: '30px', ml: 2 }} />

            </Box>
        </Box>
    );
}