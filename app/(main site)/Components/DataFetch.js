




export async function projectsData() {
    const response = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/landing-pages?pagination[page]=1&pagination[pageSize]=8000&populate=*')
    const data = await response.json()
    console.log(data.data)
    let filteredResults = data.data.filter(item => {return item.attributes.Title == "Work-Search-App" || item.attributes.Title == "Programmer-Clicker-Game"});
    console.log(filteredResults)
    return filteredResults
}