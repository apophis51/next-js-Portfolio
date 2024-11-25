'use client';



import { useBasicSelect, useBasicToggle, useAdvancedTextInput } from 'malcolm_ui_react'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import Link from 'next/link';
import useStore from "./ZustandAdmin";
import { EditMarkdown } from '../EditMarkdown';
import { addMongoDBblog } from '@/public/utils/MongoDBfunctions';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';


export default function CreateANewBlog() {

    const isCreateBlogActive = useStore((state) => state.isCreateBlogActive)
    const setBlogActive = useStore((state) => state.setCreateBlogActive)
    const blogContent = useStore((state) => state.blogContent)
    const setBlogContent = useStore((state) => state.setblogContent)
    const isLoading = useStore((state) => state.isLoading)
    const setLoading = useStore((state) => state.setLoading)
    const [title, TitleText] = useAdvancedTextInput({ prompt: "Enter A Title" })
    const [selectedType, SelectType] = useBasicSelect({ options: ["Programming", "Construction"], maintext: 'Blog Type' })
    const isCreateNewBlogPage = usePathname()?.includes('CreateANewBlog');
    const router = useRouter()
    
    async function handleAddToMongo(title:string,type:string,content:string){
        setLoading(true)
        const isAddedSuccessfully = await addMongoDBblog(title,type,content)
        if(isAddedSuccessfully == true){
            setLoading(false)
            router.push('/AdminDash')
        }

    }
    

    if (isCreateNewBlogPage && isCreateBlogActive) {
        return (
            <>
                <div className=" bg-white mx-auto container max-w-[1480px]  flex flex-col justify-center items-center gap-2">
                    <div className='min-w-full'>
                        <EditMarkdown Content={blogContent} onChange={setBlogContent} />

                    </div>
                    <TitleText />
                    <SelectType />
                    {!isLoading && <button className='btn bg-green-700 text-white w-full max-w-xs' onClick={() => handleAddToMongo(title.current selectedType, blogContent)}>Upload To MongoDB</button>}
                    {isLoading && <span className="loading loading-lg loading-spinner text-success"></span>}

                </div>
            </>
        )
    }

    return (
        <MainContentTemplate title={"Upload A New Blog"}>
            <>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex'>
                        <Link href={'/AdminDash/CreateANewBlog'}><button
                            onClick={() => setBlogActive(true)}
                            className="btn">Upload A New Blog</button></Link>
                    </div>
                </div>
            </>
        </MainContentTemplate>

    )
}


