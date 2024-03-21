"use client"
import React, { useContext, useEffect, useState } from "react"
import Nav from "@/components/plans/plans/Nav";
import Modalv3 from "@/lib/atoms/Modal-v3";
import { ModalContext } from "@/providers/ModalProvider";

function PlansLayout({ children }: {
    children: React.ReactNode
}) {
    const { setShowModal, setModalContent, modalContent, showModal } = useContext(ModalContext)!;
    const [showNav, setShowNav] = useState<boolean>(true);


    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = window.innerHeight * 0.001;
            if (window.scrollY > scrollThreshold) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])
    return (
        <div>
            <Modalv3 modalContent={modalContent} isModalOpen={showModal} onClose={() => {
                setShowModal(false)
                setModalContent(null)
            }} />
            <Nav showNav={showNav} />

            <div className="mt-16">
                {children}
            </div>


        </div>
    )
}


export default PlansLayout;