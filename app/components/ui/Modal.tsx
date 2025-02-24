'use client'
import React from 'react'
import { CloseButton } from '@/app/components/ui/CloseButton'
import { useRef, forwardRef } from 'react'

export const Modal = forwardRef(function Modal({ children, modalTitle, buttonText, CustomButton }: any, ref: any) {

    console.log('rerendered')

    const ModalRef = useRef<HTMLDialogElement>(null)

    const closeModal = () => {
        // ModalRef.current?.close();
        ref.current?.close();
    };

    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {CustomButton && <CustomButton onClick={() => ref.current?.showModal()}>{buttonText}</CustomButton> ||<button className="btn bg-green-700 text-white" onClick={() => ref.current?.showModal()}>{buttonText}</button>}
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

