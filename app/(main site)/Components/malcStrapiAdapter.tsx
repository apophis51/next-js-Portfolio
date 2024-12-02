


export default function malcStrapiAdapter(data: any) {
    console.log(data)
    // Source object
    function transformedObject(item: any) {
        console.log(item)
        console.log(item.attributes)
        return {
            image: item.attributes.LandingPageImage.data.attributes.formats.thumbnail.url,
            title: item.attributes.Title,
            headerContent: item.attributes.headerContent,
            href: item.attributes.links,
            buttonText: item.buttonText
        }

    };

    let transformedData = data.map((item: any) => {
        console.log(transformedObject(item))
        return transformedObject(item)
    })

    console.log(transformedData)

    return transformedData

}