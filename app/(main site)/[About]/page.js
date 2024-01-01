import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import About from './About'
import BottomNavBar from './BottomNavBar';
import './markdown.css'
import ProjectCards from '../ProjectCards/page';
import Container from '@mui/material/Container';


import JumboTron from '../JumboTron/page'



 

export default function FullBar(props) {
//
  // console.log(props.params.About)
  let pageToStartAt = 0
  
  if(props.params.About == 'About'){
    pageToStartAt = 0
  }
  if(props.params.About == 'Projects'){
    pageToStartAt = 1
  }

  return (
    <div>
    <JumboTron/>
    <Container maxWidth="xl"  >
    <BottomNavBar pageToStartAt = {pageToStartAt} about = {<About />} projects = {<ProjectCards />}/>
    </Container>
    </div>
  );
}