import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import About from '../About'
import BottomNavBar from './BottomNavBar';
// import '../markdown.css'  deleted 4/20/2024
import ProjectCards from '../../ProjectCards/page';
import Container from '@mui/material/Container';
import dynamic from 'next/dynamic'

import JumboTron from '../../JumboTron/page'

// const BottomNavBar = dynamic(() => import('./BottomNavBar'), {
//   ssr: false,
// })

// const JumboTron = dynamic(() => import('../../JumboTron/page'), {
//   ssr: false,
// })

 

export default function FullBar(props) {
//
   console.log(props.params.Location)
  let pageToStartAt = 0
  
  if(props.params.Location == 'About'){
    pageToStartAt = 0
  }
  if(props.params.Location == 'Projects'){
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