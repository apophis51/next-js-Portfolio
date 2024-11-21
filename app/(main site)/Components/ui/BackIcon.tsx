
export function BackIcon({ onClick }: { onClick: () => void }) {
    return (
        <button className="btn  self-start flex-none h-[60px] mt-12 mr-12 bg-blue-600 text-white hidden md:block" onClick={onClick}>


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <p>Back</p>
        </button>
    )
}



