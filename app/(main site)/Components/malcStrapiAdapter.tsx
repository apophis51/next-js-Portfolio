


export default function malcStrapiAdapter() {

    // Source object
    const sourceObject = {
        image: attributes.LandingPageImage.data.attributes.formats.thumbnail.url,
        title: attributes.Title,
        headerContent: attributes.headerContent,
        href: attributes.links,
        buttonText: buttonText
    };

    // Adapter function
    const adaptObject = (source) => {
        return {
            fullName: `${source.firstName} ${source.lastName}`,
            isAdult: source.age >= 18,
        };
    };

    // Using the adapter
    const adaptedObject = adaptObject(sourceObject);

    console.log(adaptedObject);
    // Output:
    // {
    //   fullName: "Alice Smith",
    //   isAdult: true
    // }


}