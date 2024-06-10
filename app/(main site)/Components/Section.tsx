
import { ProductPage, SectionType, UniversalData} from '@/app/(main site)/Components/Types/FetchTypes'
import { projectsData } from '@/app/(main site)/Components/DataFetch'
import Link from 'next/link'




export async function Section({content, sectionTitle}: SectionType){
    const getData = await projectsData({content})
    console.log(getData)
  
    return (
      <div className='bg-gradient-to-tr from-purple-600 to-blue-900 mt-5 flex-col flex items-center justify-center gap-5 p-6 shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)]'>
        <h2 className=" text-5xl text-white p-5">{sectionTitle}</h2>
            <div className='  flex flex-col gap-5'>
              {getData.map((item: UniversalData) => (
                <div className="card lg:card-side bg-base-100 shadow-xl lg:max-h-64">
                  <figure className='max-w-xs min-w-fit pt-7 lg:pt-10 lg:pb-10 lg:pl-10'><img src={item.attributes.LandingPageImage.data.attributes.formats.thumbnail.url} alt="Album" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.attributes.Title}</h2>
                    <p>{item.attributes.headerContent }</p>
                    <div className="card-actions justify-center">
                    {/* <Link href={item.attributes.Title}><button className="btn btn-primary"><p>Go To App</p></button></Link> */}
                    <Link href={item.attributes.links}><button className="btn btn-primary"><p>{item.buttonText}</p></button></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    )
  }
  