"use client"
import React, { useEffect, useState } from "react"
import Nav from "./Nav";


function CheckoutPlanLayout({ children }: {
    children: React.ReactNode
}) {

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

            <Nav showNav={showNav} />

            <div className="mt-16">
                {children}
            </div>


        </div>
    )
}


export default CheckoutPlanLayout;