import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';
import Collasible from "@/app/(main site)/Components/ui/collapsible";
import { findByBlogUrlAndType } from "@/app/(main site)/Components/db_services/mongo";
//  import { generateMetadata } from "@/app/(main site)/Components/LandingPageMeta";



// export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {  //only suported in server components
//     const myParamsID = await params
//     // const data = await serverGetBlogsByTitle(myParamsID.id)
//     // console.log(data)

//     return {
//       title: 'Blog',
//       description: 'Desciption'
//     }
//   }
export default  async function GirlxAi() { 
let dropdownData = await findByBlogUrlAndType("girlfriend-ai-chat-new", "dropdown")
console.log(dropdownData)

    return (
        <div>
            <Container maxWidth="xl"  >
                <div className="flex flex-col gap-4 overflow-x-hidden">
                    <div>
                        <AIArticleGenerator
                            titleName="GirlxAi Uncensored Chat"
                            AI_product_name="GirlxAi"   // This name appears in the buy header and Title header
                            imageSRC="/girl.jpg"        //no image if this is not set
                            imgTagline="Hola! I'm the horniest girl you'll ever meet. tehe"  //no tagline if this is not set
                            setting_CloseButton={true}
                            hide_settings_and_save_button={true}
                            AI_Select_Setting={false}  // lets you select different ai models
                            AI_Bot_Setting="uncensored chat ai"
                            show_user_text={true}
                            purchaseLink="/Web-Apps/girlfriend-ai-chat-new"  //this is the purchase link... if you are doing beta set this page to the original page since they cant purchase once we reactivate it set it to /PurchaseMenu/girlfriend_ai_cha
                            disableCreditBuying={true}
                            submitButtonText="Submit"
                            buy_more_AI_credit_Message="We are In Beta. Wait 24 hours to get 12 more Credits!"
                        />

                    </div>
                </div>
            </Container>
            <Container maxWidth="xl">
                <div className="my-5 h-screen">
                    <Collasible dropdownData={dropdownData}/> 
                </div>
            </Container>
        </div>
    );
}