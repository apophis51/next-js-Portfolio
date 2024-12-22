import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';


export default function AdminDash() {

  
    return (
        <Container maxWidth="xl"  >   
        <div className="flex flex-col gap-4 overflow-x-hidden">
            <div>
                <AIArticleGenerator titleName="GirlxAi Uncensored Chat" AI_product_name="GirlxAi"/>
            </div>
        </div>
        </Container>
    );
}