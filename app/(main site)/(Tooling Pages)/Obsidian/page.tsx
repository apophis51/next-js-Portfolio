'use client'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
// export const revalidate = 0
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import useBasicText from '@/app/(main site)/Components/ui/BasicTextInput';
import {blog_link_extractor, transmitBlog} from '@/app/(main site)/(Tooling Pages)/Obsidian/serverController'






export default function Page() {
const [text, BasicText] = useBasicText({prompt: 'Enter a BLog'})

console.log('test')

  return (
    <MainContentTemplate title={"Obsidian Blog Submitter Helper"}>
    <div className='flex flex-col justify-center items-center'>
      <div className='flex'>
      <BasicText />
      <button
      onClick = {async() => await transmitBlog('POST', await blog_link_extractor(`${text.current}.md`),text.current)} 
      className="btn">Submit</button>
      <a href="obsidian://open?vault=Obsidian%20Vault&file=RAM.md"><button className='btn' >Navigate to Random Obsidian Page</button></a>
      </div>
    </div>
    </MainContentTemplate>
    
  )
}

