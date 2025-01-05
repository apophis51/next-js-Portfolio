'use server'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {  //only suported in server components
    const myParamsID = await params
    // const data = await serverGetBlogsByTitle(myParamsID.id)
    // console.log(data)

    return {
      title: 'Blog',
      description: 'Desciption'
    }
  }