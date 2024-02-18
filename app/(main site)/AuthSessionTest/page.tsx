import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import {User} from '../user'
import { LoginButton, LogoutButton } from "../auth";  
import { Providers } from '../providers'; //added 9/1/2023 everything that says providers in this doc


export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <main className="bg-white">
            <LoginButton/>
            <LogoutButton/>
            <div>Server Session</div>
            <pre>{JSON.stringify(session)}</pre>
            <h2>Client Call</h2>
            <User/>
        </main>
    )


}