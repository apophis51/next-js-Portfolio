'use client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import * as React from 'react';
import page from './page.css'
import AOS from 'aos';
import 'aos/dist/aos.css'


export default function MediaCard(props) {
  const [textSlice, setTextSlice] = React.useState(150);
  const [textEllipses, setTextEllipses] = React.useState('...');
  const [textCollapse, setTextCollapse] = React.useState('Learn More');
  const{blogTitle, blogWebsite, blogContent,blogStack, blogImage} = props

React.useEffect(() => {
AOS.init()
}, [])

  const handleTextSlice = (event) => {
    if (textSlice === 150) {
    setTextSlice(1000);
    setTextEllipses('');
    setTextCollapse('Collapse');}
    else {
    setTextSlice(150);
    setTextEllipses('...');
    setTextCollapse('Learn More');
    }
  };

  return (
    <Card sx={{ maxWidth: 400,
                maxHeight: 6200,
                minHeight: 620,
                Display: 'flex',
                }} 
                data-aos="flip-left"
                data-aos-duration="1000"
                >
                
      
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" data-aos="fade-left" data-aos-duration="2500">
        <Link href={blogWebsite}>{blogTitle}</Link>
          
        </Typography>
        <Typography variant="body2" color="text.secondary" data-aos="fade-right" data-aos-duration="2500">
          <b>Stack Used: </b>{blogStack}
        </Typography>
        <div class="border-t border-black mb-4"></div>

          {/* <img src = {`${blogImage}`} width={100} height={100}/> */}
          <img src = {blogImage}  data-aos="zoom-in" data-aos-duration="10000"/>
        <Typography variant="body2" color="text.secondary" data-aos="zoom-in" data-aos-duration="5000">
          <div class="border-t border-black mt-4"></div>
          <b>Description</b><ReactMarkdown >{blogContent.slice(0,textSlice) + textEllipses}</ReactMarkdown>
          <Button size="small" onClick = {handleTextSlice}>{textCollapse}</Button>
          <p><b>Website: </b><Link href={blogWebsite}>{blogWebsite}</Link></p>
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" >Learn More</Button>
      </CardActions> */}
    </Card>
   
  );
}
