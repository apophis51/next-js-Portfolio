


export type ProductPage = {
    attributes: {
        LandingPageImage: {
            data: {
                attributes: {
                    formats: {
                        thumbnail: {
                            url: string
                        }
                    }
                }
            }
        },
        Title: string,
        headerContent: string
    }
}

export type Description = {
    description: string
}

export type BlogPage = {
    attributes: {
        FrontImage: {
            data: {
                attributes: {
                    formats: {
                        thumbnail: {
                            url: string
                        }
                    }
                }
            }
        },
        Blog_Type: string,
        Content: string
    }
}

export type Links = {
       links: string
}

export type Title = {
    Title: string
}

export type SectionType = {
    getData: any,
    // content: "WorkSearchApp" | "WebApps" | "ProgrammingBlogs",
    sectionTitle: string | null
 }

 export type Image = {
    Image: string
 }

export type MetaData = {
    buttonText: "Go To App" | "Read More"
    frontmatterDescrition: string
    frontmatterTitle: string
    articleContent: string
}

export type UniversalData = ProductPage & BlogPage & Links & MetaData & Description & Title & Image