
import { parseFrontmatter } from '@/app/(main site)/Components/Utils/parseFrontmatter'
import { ProductPage, UniversalData, SectionType} from '@/app/(main site)/Components/Types/FetchTypes'

export async function projectsData({ content }: SectionType) {
    

    if (content == "WebApps") {
        const response = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/landing-pages?pagination[page]=1&pagination[pageSize]=8000&populate=*')
        const data = await response.json()
        console.log(data.data)
        let filteredResults = data.data.filter((item: UniversalData) => { 
            const productlink = item.attributes.links = item.attributes.Title;
            const buttonText = item.buttonText = "Go To App";
            return item.attributes.Title == "Work-Search-App" || item.attributes.Title == "Programmer-Clicker-Game" 
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
                console.log(item.attributes.Title)
                item.attributes.links = `/Work-Search-App/${(item.attributes.Title).toLowerCase().replace(/,/g, '').split(' ').join('-')}`
                let { content, frontmatter } = parseFrontmatter(item.attributes.Content)
                console.log(content)
                console.log(frontmatter)
                item.articleContent = content
                item.frontmatterDescrition = frontmatter.description
                item.frontmatterTitle = frontmatter.title

                item.attributes.headerContent = frontmatter.description
                item.buttonText = "Read More"
            }
            return item.attributes.Blog_Type == "WorkSearchApp" 
        });
        console.log(filteredResults)
        return filteredResults
    }
}