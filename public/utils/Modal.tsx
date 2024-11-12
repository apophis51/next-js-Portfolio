'use client'
import React from 'react'
import { CloseButton } from '@/public/utils/CloseButton'
import { useRef, forwardRef } from 'react'

export const Modal = forwardRef(function Modal({ children }: any, ref:any) {

    console.log('rerendered')

    const ModalRef = useRef<HTMLDialogElement>(null)

    const closeModal = () => {
        // ModalRef.current?.close();
        ref.current?.close();
    };

    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn bg-green-700 text-white" onClick={() => ref.current?.showModal()}>Save To MongoDB</button>
            <dialog id="my_modal_1" ref={ref} className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                            <CloseButton callback={closeModal}>
                                <p className="text-center">Please Enter A Title And ArticleType To Submit To MongoDB</p>
                                <div className="flex flex-col gap-2 justify-space-between">
                                    {children}
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

