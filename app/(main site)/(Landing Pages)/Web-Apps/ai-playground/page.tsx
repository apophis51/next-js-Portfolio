import AIGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';
import Collasible from "@/app/(main site)/Components/ui/collapsible";
import { findByBlogUrlAndType } from "@/app/(main site)/Components/db_services/mongo";


export default async function AdminDash() {
    let dropdownData = await findByBlogUrlAndType("ai-playground", "dropdown")

    return (
        <div>
            <Container maxWidth="xl"  >
                <div className="flex flex-col gap-4 overflow-x-hidden">
                    <div>
                        <AIGenerator titleName="MalcMind - AI Article PlayGround" AI_product_name="MalcMind AI" hide_settings_and_save_button={true} />
                    </div>
                </div>
            </Container>
            <Container maxWidth="xl">
                <div className="my-2 min-h-screen">
                    <Collasible dropdownData={dropdownData} />
                </div>
            </Container>
        </div>
    );
}