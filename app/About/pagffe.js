'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useSWR from 'swr'
import ReactMarkdown from 'react-markdown'
import styles from './markdown.css'



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgb(88, 28, 135)'
      : '#1b4192',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
    color: "white"

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function About() {
  const [expanded, setExpanded] = React.useState('');
  const { data, error, isLoading } = useSWR('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>"..Loading"</div>


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
      <div className='flex justify-evenly' style={{backgroundColor: "rgb(88, 28, 135)"}}>
      <div className=''></div>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{backgroundColor: 'rgb(88, 28, 135)'}}>
          <div className=' ' >
            <div className="lg:mr-60">
          <Typography className = "text-4xl">About Me</Typography>
          </div>
          </div>
        </AccordionSummary>
        <div className=' '></div>
        </div>
        <AccordionDetails >
        <Container maxWidth="xl" >
          <Typography>
          <ReactMarkdown>{data.data[9].attributes.Content}</ReactMarkdown>
            <ReactMarkdown>{data.data[8].attributes.Content}</ReactMarkdown>
          </Typography>
          </Container>
        </AccordionDetails>
      </Accordion>

{/* 

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <div className = "flex justify-center" style={{backgroundColor: "rgb(88, 28, 135)"}}>
          <div className = "bg-slate-700 w-3/5 ">
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={{backgroundColor: 'rgb(88, 28, 135)'}}>
          <Typography className = "text-4xl ml-auto mr-auto">About Me</Typography>
          
        </AccordionSummary>
        </div>
        <div className="lg:w-1/5 bg-"></div>
        </div>
        <AccordionDetails>
          <Typography>
          <ReactMarkdown>{data.data[8].attributes.Content}</ReactMarkdown>

          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
