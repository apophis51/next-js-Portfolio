// 'use client'
//possible vulnerability because we import our env variable
//url code smell

// import { useSearchParams } from 'next/navigation'


import Container from '@mui/material/Container';
import AuthorizeUIComponent from './AuthorizeUIComponent'
import { headers } from 'next/headers'


export default function AuthorizeExtention(params){
    // const headersList = headers()
    // const [myWebSocket, setMyWebSocket] = useState(null)
    // const [emailAddress, setUserEmail] = useState(null)
  
    let connectingUser = params.searchParams.id
    let originURL = headers().get('referer')

    
 
    console.log(connectingUser)
    // headersList.forEach((item) => (console.log(item)))
    // console.log(headersList.get('access-control-request-method'))
    // const referer = headersList.get('referer')


    //  useEffect(() => {
    //     let originURL =  (async function getHeaders(){
    //         console.log('triggered')
    //         let originURL = await envUtils.getHeaders()
    //         console.log(originURL)
    //         setOriginURL(originURL)
    //         return originURL
    //     }
    //     )()
        // const ws = new WebSocket('ws://localhost:3532');
        // setMyWebSocket(ws)
        // console.log(emailAddress)
        // ws.onopen = () => {
        //     // ws.send(JSON.stringify({ type: 'hello', data: emailAddress }));
        // };
        // ws.onmessage = (event) => {
        //     const newData = JSON.parse(event.data);
        //     console.log(newData)
        // };
        // return () => {
        //     ws.close();
        // };
    //  }, []);



    return (
        <Container maxWidth="xl">
<AuthorizeUIComponent originURL={originURL} connectingUser={connectingUser}/>
            </Container>
    )
}