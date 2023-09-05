
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'



export default function MediaCard(props) {
    const{ blogTitle, blogLink, blogContent} = props
  return (
    <Card sx={{ maxWidth: 400,
                maxHeight: 620,
                minHeight: 620,
                Display: 'flex',
                }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blogTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Link href = {blogLink}>{blogContent}</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" >Learn More</Button>
      </CardActions>
    </Card>
   
  );
}
