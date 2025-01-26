// a next 15 get route


import { NextResponse, NextRequest } from 'next/server'
import {getUsersBlogsWithAPI} from "@/app/(main site)/Components/db_services/mongo"
import   * as corsConfig from "@/app/utils/corsConfig"


export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams

    const apiKey = params.get('apiKey')
    let result = await getUsersBlogsWithAPI(apiKey)
    let stringifyResult = JSON.stringify(result)
    return NextResponse.json(result,
        corsConfig.allowCors)
}



