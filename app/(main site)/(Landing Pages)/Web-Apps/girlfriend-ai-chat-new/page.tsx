import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';


export default function AdminDash() {

  
    return (
        <Container maxWidth="xl"  >   
        <div className="flex flex-col gap-4 overflow-x-hidden">
            <div>
                <AIArticleGenerator 
                titleName="GirlxAi Uncensored Chat" 
                AI_product_name="GirlxAi" 
                imageSRC="/girl.jpg"
                imgTagline="Hola! I'm the horniest girl you'll ever meet. tehe"
                setting_CloseButton={true}
                hide_settings_and_save_button={true}
                />
                
            </div>
        </div>
        </Container>
    );
}