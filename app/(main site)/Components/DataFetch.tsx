
import { parseFrontmatter } from '@/app/(main site)/Components/Utils/parseFrontmatter'
import { ProductPage, UniversalData, SectionType} from '@/app/(main site)/Components/Types/FetchTypes'

export async function projectsData({ content }: { content: string }) {
    

    if (content == "WebApps") {
        const response = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/landing-pages?pagination[page]=1&pagination[pageSize]=8000&populate=*')
        const data = await response.json()
        console.log(data.data)
        let filteredResults = data.data.filter((item: UniversalData) => { 
            item.links = item.attributes.Title;
            item.buttonText = "Go To App";
            item.description = item.attributes.headerContent 
            item.Title = item.attributes.Title 
            item.Image = item.attributes.LandingPageImage.data.attributes.formats.thumbnail.url
            if (item.attributes.Title == "PwnContracting") {
                item.links = "https://pwncontracting.com/"
            }
            if(item.attributes.Title == "girlfriend-ai-chat"){
                item.links = "/Web-Apps/girlfriend-ai-chat-new" 
            }
            if(item.attributes.Title == "ai-article-generator"){
                item.links = "/Web-Apps/ai-article-generator"
            }
            return item.attributes.Title == "Work-Search-App" || item.attributes.Title == "Programmer-Clicker-Game"  || item.attributes.Title == "PwnContracting" || item.attributes.Title == "girlfriend-ai-chat" || item.attributes.Title == "ai-article-generator"
        });
        console.log(filteredResults)
        return filteredResults
    }
    if (content == "WorkSearchApp") {
        const response = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000&populate=*')
        const data = await response.json()
        console.log(data.data)
        let filteredResults = data.data.filter((item: UniversalData) => { 
            // data from the programming-blogs endpoint has a different name for the image so we need to add the attribute name the output expects
            if(item.attributes.Blog_Type == "WorkSearchApp"){
                item.attributes.LandingPageImage = item.attributes.FrontImage
                item.Title = item.attributes.Title
                item.Image = item.attributes.LandingPageImage.data.attributes.formats.thumbnail.url
                console.log(item.attributes.Title)
                item.links = `/Work-Search-App/${(item.attributes.Title).toLowerCase().replace(/,/g, '').split(' ').join('-')}`
                let { content, frontmatter } = parseFrontmatter(item.attributes.Content)
                item.description = frontmatter.description
                item.buttonText = "Read More"
            }
            return item.attributes.Blog_Type == "WorkSearchApp" 
        });
        console.log(filteredResults)
        return filteredResults
    }
}