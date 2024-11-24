'use client'

export const dynamic = 'force-dynamic'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import Link from 'next/link';
import  useStore  from "./ZustandAdmin";
import { EditMarkdown } from '../EditMarkdown';

export default function CreateANewBlog() {

  const isCreateBlogActive = useStore((state) => state.isCreateBlogActive)
  const setBlogActive = useStore((state) => state.setCreateBlogActive)


  if (isCreateBlogActive) {
    return (
      <div className='min-w-full'>
      <EditMarkdown Content={'# Make a New BLog'} onChange={() => {}} />
      <button>Submit Blog</button>
      </div>
    )
  }

  return (
    <MainContentTemplate title={"Upload A New Blog"}>
      <>
    <div className='flex flex-col justify-center items-center'>
      <div className='flex'>
      <Link href={'/AdminDash/CreateANewBlog'}><button
      onClick = {() => setBlogActive(true)} 
      className="btn">Upload A New Blog</button></Link>
      </div>
    </div>
    </>
    </MainContentTemplate>
    
  )
}
