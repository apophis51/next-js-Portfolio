'use client'
import React, { useEffect } from 'react'
import { CloseButton } from '@/app/components/ui/CloseButton'
import { useRef, forwardRef } from 'react'
import { on } from 'events'

type callback = () => void | undefined | null

// function randomShit() {
//     console.log('hi bitch')
// }

export const Modal3 = forwardRef(function Modal({ children, modalTitle, buttonText, CustomButton, hideOutsideButton=false, buttonCallback }: {children?: any, modalTitle: string, buttonText?: string, CustomButton?: any, hideOutsideButton?: any, buttonCallback?: callback}, ref: any) {


    function handleClick(){
        // return(ref.current?.showModal())
        console.log(!!buttonCallback)
        let modalAllowed:any = false
        if (buttonCallback) {
            modalAllowed= buttonCallback()
            console.log(modalAllowed)
        };
        if (!modalAllowed) ref.current?.showModal();
        // else ref.current?.showModal();
        // return(randomShit)
    }
    // const handleClick = () => {
    //     ref.current?.showModal();
    // };


    console.log('rerendered')

    const ModalRef = useRef<HTMLDialogElement>(null)

    const closeModal = () => {
        // ModalRef.current?.close();
        ref.current?.close();
    };

    useEffect(() => {
        if (ref.current && !buttonText) {
            ref.current.showModal();
        }
    }, [ref]);


    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {!hideOutsideButton && ( buttonText && (CustomButton && <CustomButton onClick={handleClick}>{buttonText}</CustomButton> ||<button className="btn bg-green-700 text-white" onClick={handleClick}>{buttonText}</button>))}
            <dialog id="my_modal_1" ref={ref} className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <CloseButton callback={closeModal}>
                            <div>
                                <p className="text-center">{modalTitle}</p>
                                <div className="flex flex-col gap-2 ">
                                    {children}
                                </div>
                            </div>
                            {/* if there is a button in form, it will close the modal */}
                        </CloseButton>
                        {/* </form> */}
                    </div>
                </div>
            </dialog>
        </>
    )
})

