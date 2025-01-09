
export const dynamic = 'force-dynamic'

import AIGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';


export default function AdminDash() {

  
    return (
        <Container maxWidth="xl"  >   
        <div className="flex flex-col gap-4 overflow-x-hidden  min-h-screen">
            <div>
                <AIGenerator titleName="MalcMind - AI Article PlayGround" AI_product_name="MalcMind AI" hide_settings_and_save_button={true}/>
            </div>
        </div>
        </Container>
    );
}