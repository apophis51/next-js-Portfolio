"use client"



export function CloseButton({ children, top, callback=() => {console.log ("clicked")} } : any) {

    return (
        <>
            <div className="relative">
                <button
                    className="btn btn-sm btn-circle bg-yellow-300 absolute left-[95%] top-[-30px]"
                    onClick={async () => {
                        callback()
                    }}
                >✕</button>
                {children}
            </div>
        </>
    )
}