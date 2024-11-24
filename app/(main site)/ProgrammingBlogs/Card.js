import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function MediaCard(props) {
  const { blogTitle, blogLink, blogContent } = props;
  return (
    <div className="shadow-[0px_0px_10px_1px_rgba(255,255,255,0.5)]">
      <Card className="flex flex-col max-w-[400px] min-h-[720px] max-h-[720px]">
        {/* Content Section */}
        <CardContent className="flex-grow">
          <Typography variant="body2" color="text.secondary">
            <Link href={blogLink}>{blogContent}</Link>
          </Typography>
        </CardContent>

        {/* Actions Section */}
        <CardActions className="mt-auto flex justify-end">
          <Button size="small">
            <Link href={blogLink}>Learn More</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
