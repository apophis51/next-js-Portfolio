'use client'
import React, { useEffect } from 'react'
import { CloseButton } from '@/public/utils/CloseButton'
import { useRef, forwardRef } from 'react'

export const Modal2 = forwardRef(function Modal({ children, modalTitle, buttonText, CustomButton }: {children?: any, modalTitle: string, buttonText?: string, CustomButton?: any}, ref: any) {

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
            {buttonText &&(CustomButton && <CustomButton onClick={() => ref.current?.showModal()}>{buttonText}</CustomButton> ||<button className="btn bg-green-700 text-white" onClick={() => ref.current?.showModal()}>{buttonText}</button>)}
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

