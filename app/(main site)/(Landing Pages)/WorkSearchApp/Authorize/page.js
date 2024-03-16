
'use s'
import { headers } from 'next/headers'



export default function AuthorizeExtention(){
    const headersList = headers()
    console.log(headersList)
    // headersList.forEach((item) => (console.log(item)))
    console.log(headersList.get('access-control-request-method'))
    // const referer = headersList.get('referer')

    return (
            <div className='bg-white'>
                <h1>Authorize</h1>
                <p>Authorize this app to access your data</p>
                {/* <p>Referer is: {referer}</p> */}
            </div>
    )
}