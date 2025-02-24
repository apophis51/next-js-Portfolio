"use client"
import type { ReactNode } from 'react';

interface CloseButtonProps {
    /** 
     * Optional children elements that will be rendered inside the CloseButton component. 
     */
    children?: ReactNode;

    /** 
     * The left position of the button as a percentage of its container. 
     * @default 95
     */
    left?: number;

    /** 
     * The bottom position of the button as a percentage of its container.
     * @default 99.5
     */
    bottom?: number;

    /** 
     * Function to be executed when the button is clicked.
     * @default () => { console.log("clicked") }
     */
    callback?: () => void;
}

export function CloseButton({ children,left=95, bottom=99.5, callback=() => {console.log ("clicked")} }: CloseButtonProps) {
    return (
        <>
            <div className="relative w-full">
                <button
                    className={`btn btn-sm btn-circle bg-yellow-300 absolute left-[${left}%] bottom-[${bottom}%]`}
                    onClick={async () => {
                        callback()
                    }}
                >✕</button>
                {children}
            </div>
        </>
    )
}