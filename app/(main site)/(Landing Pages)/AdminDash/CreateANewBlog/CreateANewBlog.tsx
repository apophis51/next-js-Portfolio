'use client';



import { useBasicSelect, useBasicToggle, useAdvancedTextInput } from 'malcolm_ui_react'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import Link from 'next/link';
import useStore from "./ZustandAdmin";
import { EditMarkdown } from '../EditMarkdown';
import { addMongoDBblog } from '@/public/utils/MongoDBfunctions';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useLoading from '@/app/(main site)/Components/ui/Loading';


export default function CreateANewBlog() {

    const isCreateBlogActive = useStore((state) => state.isCreateBlogActive)
    const setBlogActive = useStore((state) => state.setCreateBlogActive)
    const blogContent = useStore((state) => state.blogContent)
    const setBlogContent = useStore((state) => state.setblogContent)
    // const isLoading = useStore((state) => state.isLoading)
    // const isSubmitted = useStore((state) => state.isSubmitted)
    // const setSubmitted = useStore((state) => state.setSubmitted)
    const [title, TitleText] = useAdvancedTextInput({ prompt: "Enter A Title" })
    const [selectedType, SelectType] = useBasicSelect({ options: ["Programming", "Construction"], maintext: 'Blog Type' })
    const isCreateNewBlogPage = usePathname()?.includes('CreateANewBlog');

    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()
    // const setLoading = useStore((state) => state.setLoading)
    const router = useRouter()


    async function handleAddToMongo(title: string, type: string, content: string) {
        setLoading("on")
        const isAddedSuccessfully = await addMongoDBblog(title, type, content)
        if (isAddedSuccessfully == true) {
            // setLoading(false)
            setLoading("Successful")
        }
        else {
            setLoading("error")
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
                    <LoadingWrapper>
                        <button className='btn bg-green-700 text-white w-full max-w-xs' onClick={() => handleAddToMongo(title.current, selectedType, blogContent)}>Upload To MongoDB</button>
                    </LoadingWrapper>
                    <LoadSuccess>
                        <Link href={'/AdminDash'}>
                            <button className='btn bg-blue-700 text-white w-full max-w-xs' onClick={() => setLoading("off")}>Return To Admin Dash</button></Link>
                        <p className="text-green-600">Blog Successfully Uploaded</p>
                    </LoadSuccess>
                    <LoadError>
                        <button className='btn bg-red-700 text-white w-full max-w-xs' onClick={() => handleAddToMongo(title.current, selectedType, blogContent)}>Problem With Server, Contact Support Or Click To Try Again.</button>
                    </LoadError>


                </div >
            </>
        )

    }

    return (
        <MainContentTemplate title={"Upload New Content"}>
            <>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex'>
                        <Link href={'/AdminDash/CreateANewBlog'}><button
                            onClick={() => setBlogActive(true)}
                            className="btn">Upload/Create</button></Link>
                    </div>
                </div>
            </>
        </MainContentTemplate>

    )
}


