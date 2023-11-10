import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import About from '../About/About'
import BottomNavBar from './BottomNavBar';
import './markdown.css'
import ProjectCards from '../ProjectCards/page';
import Container from '@mui/material/Container';



 

export default function FullBar() {
  return (
    <div>
      <Container maxWidth="xl"  >
    <BottomNavBar about = {<About />} projects = {<ProjectCards />}/>
    </Container>
    </div>
  );
}