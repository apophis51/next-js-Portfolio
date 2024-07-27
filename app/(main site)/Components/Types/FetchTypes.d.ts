


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
    attributes: {
       links: string
    }
}

export type SectionType = {
    content: "WorkSearchApp" | "WebApps" | "ProgrammingBlogs",
    sectionTitle: string | null
 }

export type MetaData = {
    buttonText: "Go To App" | "Read More"
    frontmatterDescrition: string
    frontmatterTitle: string
    articleContent: string
}

export type UniversalData = ProductPage & BlogPage & Links & MetaData