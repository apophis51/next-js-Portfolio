export function EyeIcon({ onClick }: { onClick: () => void }) {
    return (
        <div className="max-w-[60px]"> 
        <button className="btn text-center flex-none  h-[80px] max-w-[70px] mt-12 mr-12 bg-yellow-600 text-white hidden md:block" onClick={onClick}>

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-1">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                </svg>
                
            </div>
            <div className="flex justify-center items-center text-xs">
                <p className="block">Preview</p>
            </div>
        </button>
        </div>
    )
}


