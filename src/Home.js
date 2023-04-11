import React from 'react';
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import { TextField, Button, Grid } from '@mui/material';
import Footer from './Footer';
import '@fontsource/roboto/300.css';

const useStyles = styled({
  formContainer: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '2rem',
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      {/* <main>
        <div className={classes.formContainer}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField label="District" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="City" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Country" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Rental Period" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Number of People" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </main> */}
    </>
  );
}