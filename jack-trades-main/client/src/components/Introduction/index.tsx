/* eslint-disable @typescript-eslint/no-unused-vars */
import './Introduction.css';
import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IntroductionCard from './IntroductionCard';
import { introduction } from '../../StaticData';

const Introduction:FC = () => (
  <Box sx={{ flexGrow: 1, width: '90%', margin: '5rem auto' }}>
    <Grid container spacing={4}>
      {introduction.map((e) => (
        <Grid key={e.title} item xs={12} md={4}>
          <IntroductionCard data={e} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Introduction;
