'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import About from '../About/About'
import  ReactMarkdown  from "react-markdown"
import Script from 'next/script';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function BottomNavBar(props) {
  
  const [value, setValue] = React.useState(0);
 

  
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
      <div className = 'canviswrap'>
    <canvas id="granim-canvas"></canvas>
    <Script src="granim.min.js" 
    strategy = 'beforeInteractive'
    ></Script>
   {/* {mygranium()} */}

    <Box sx={{ width: '100%' }} className = " child">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ color: 'white'}} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered style = {{minHeight: "80px"}} className='flex  justify-center items-center lg:pr-52'>
          <Tab label="About Me" {...a11yProps(0)} className = 'text-white text-3xl' />
          <Tab label="My Projects" {...a11yProps(1)} className = 'text-white text-3xl'/>
        </Tabs>
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