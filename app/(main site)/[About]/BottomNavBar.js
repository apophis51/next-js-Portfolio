'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Script from 'next/script';
import { green, purple,yellow } from '@mui/material/colors';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { use } from 'chai';



const theme2 = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
console.log(props)
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

//this a11yprops function was from materialui Basic tab example
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function BottomNavBar(props) {
  
  const [value, setValue] = React.useState(props.pageToStartAt);
  const [aboutColor, setAboutColor] = React.useState('text-white');
  const [projectsColor, setProjectsColor] = React.useState('text-white');
  const params = useParams().About

  React.useEffect(() => {
    if (params == 'Projects'){setProjectsColor('text-yellow-300')}
    if (params == 'About'){setAboutColor('text-yellow-300')}
  }, [])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const mygranium = () => {
    try {
    var granimInstance = new Granim({
       element: '#granim-canvas',
       name: 'granim',
       opacity: [1, 1],
       states : {
           "default-state": {
               gradients: [
                   ['#311b92', '#D04ED6'],
                   ['rgb(88, 28, 135)', '#7c3aed']
               ]
           }
       }
    });
    }
  
  catch{

  }
  }


  React.useEffect(() => {
    mygranium()
  }, [])

  return (
    <div>
      <div className = 'granim-relative'>
    <canvas id="granim-canvas"></canvas>
    <Script src="granim.min.js" 
    strategy = 'beforeInteractive'
    ></Script>
   {/* {mygranium()} */}

    <Box sx={{ width: '100%' }} className = " child">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ color: 'white'}} >
        {/* Tab Features https://mui.com/material-ui/react-tabs/*/}
        <ThemeProvider theme={theme2}>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered style = {{minHeight: "80px"}} className='flex  justify-center items-center lg:pr-52'
        textColor='secondary' indicatorColor='secondary'>
          <Link href='/About' scroll={false}><Tab label="About" {...a11yProps(0)} className = {`${aboutColor} text-3xl`} /></Link>
          <Link href='/Projects' scroll={false}><Tab label="Projects" {...a11yProps(1)} className = {`${projectsColor} text-3xl`}/></Link>
        </Tabs>
        </ThemeProvider>

      </Box>
      <CustomTabPanel value={value} index={0}>
      {props.about}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {props.projects}
      </CustomTabPanel>
    </Box>
    </div>
    </div>

  );
}