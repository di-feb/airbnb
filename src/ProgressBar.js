import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" color='inherit' {...props} sx={{borderRadius:'50px'}}/>
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary" fontSize='12px'>{ (props.value / 20).toFixed(1) }</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function ProgressBar(props) {
    const [progress, setProgress] = React.useState(props.value * 20);

    

    return (
        <Box sx={{ width: '100%', mt:2 }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}