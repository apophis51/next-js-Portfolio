'use client'

import Container from '@mui/material/Container';



export default function MainContentTemplate({ title, children }:{title: string, children: JSX.Element}) {
    //we dont have our custom hook labeled as useClient becuse we need to import it to some of our server components as a component to avoid compiling errors because server components cant use client hooks, but they can use client components
    
    return (
        <Container maxWidth="xl"  >
            <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
                <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
                    <h1 className='text-center'>{title}</h1>
                    {children}
                </div>
            </div>
        </Container>)
};

