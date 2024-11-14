import { NextResponse } from 'next/server'
// import { updateApplied } from '../page'
import { headers } from 'next/headers'

console.log('hit')

function runDeployScript() {

    let { exec } = require('child_process')

    return new Promise((resolve, reject) => {
        exec('cd /mnt/c/Users/malco/Malcolm_chrome_extentions/MalcMindJobTracker_V4/ && ls && npm run build', (err, stdout, stderr) => {
            if (err) {
                console.error(err)
                resolve(err)
            }
            console.log(stdout)
            return resolve(stdout)
        })
    })

}

export async function OPTIONS() {
    return NextResponse.json(
        {
            data: {
                information: 'fuck yeah nigga'
            }
        },
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
                "Access-Control-Allow-Origin": "*",
                "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
            },
        })
}


export async function GET(req) {
    let ourHeaders = await headers()
    console.log(ourHeaders)
    console.log(ourHeaders.get('referer'))
    console.log('we got  a hit')
    let scriptResult = await runDeployScript()
    console.log(scriptResult)
    return NextResponse.json(
        {
            deploymentStatus: scriptResult
        },
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": "*",
                "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
            },
        })
}
