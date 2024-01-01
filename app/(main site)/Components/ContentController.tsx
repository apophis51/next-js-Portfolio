'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { green, purple,yellow } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Link from 'next/link'



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({landingpage, tabContent} : {tabContent: any, landingpage: any}) {
  const contentSetter = (tabContent: any, landingpage: any) => { 
  let accumulator = 0
  for (let x of tabContent)
  {
    if (x.landingPage == landingpage)
    {
      return accumulator
    }
    accumulator = accumulator + 1
  }
  
  }
  const [value, setValue] = React.useState(contentSetter(tabContent, landingpage));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
    <ThemeProvider theme={theme2}>
    <Box sx={{ width: '100%', background: 'linear-gradient(45deg, purple, darkblue)', boxShadow: '0px 0px 10px 3px rgba(255,255,255,0.5)', marginTop:'20px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered textColor='secondary' indicatorColor='secondary'>
          {tabContent.map((item: any, index: any) =>
          <Link href={item.landingPage} scroll={false}>
            <Tab label={item.TabName} {...a11yProps(index)} sx ={{color:'white', 
          fontSize: 14,
          // Responsive font size using media queries
          '@media (min-width:400px)': {
            fontSize: 14,
          },
          '@media (min-width:500px)': {
            fontSize: 24,
          },
        }}/>
         </Link>
          )}
        </Tabs>
      </Box>
      {tabContent.map((item: any, index: any) => 
       <CustomTabPanel value={value} index={index}>
       {item.Content}
      </CustomTabPanel>
      )}
    </Box>
    </ThemeProvider>
    </div>
  );
}