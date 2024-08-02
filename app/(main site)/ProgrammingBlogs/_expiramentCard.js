
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import Image from 'next/image'


export default function MediaCard(props) {
  const { blogTitle, blogLink, blogContent, blogPicture } = props
  return (
<div className='shadow-[0px_0px_10px_1px_rgba(255,255,255,0.5)] h-[720px] max-w-[400px] bg-white flex flex-col justify-evenly'>
      {/* <Card sx={{
        maxWidth: [300, 400], //mui uses breakpoints
        // maxHeight: 720, //used to be 620
        // minHeight: 720, //used to be 620
      }}> */}
        <div className=''>
          <CardContent >
            {/* <div className ='bg-blue-900'>
        <Typography gutterBottom variant="h5" component="div">
          {blogTitle}
        </Typography>
        </div> */}
            <Typography variant="body2" color="text.secondary">
              <Link href={blogLink}>{blogTitle}</Link>
            <Link href={blogLink}><Image width={400} height={300} src= {blogPicture}/></Link>
              <Link href={blogLink}>{blogContent}</Link>
            </Typography>
          </CardContent>
        </div>
        <div className= ''>
          <CardActions>
            <Button size="small" ><Link href={blogLink}>Learn More</Link></Button>
          

          </CardActions>
        </div>
      {/* </Card> */}
    </div>
  );
}
