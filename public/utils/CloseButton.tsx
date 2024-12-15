"use client"



export function CloseButton({ children, top, callback=() => {console.log ("clicked")} } : any) {

    return (
        <>
            <div className="relative w-full">
                <button
                    className="btn btn-sm btn-circle bg-yellow-300 absolute left-[95%] bottom-[99.5%]"
                    onClick={async () => {
                        callback()
                    }}
                >✕</button>
                {children}
            </div>
        </>
    )
}