import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center flex-shrink-0 text-black mr-6 gap-4 pl-6">
            <Image src="/company.png" alt="logo" width={40} height={40} />

            <span className="font-semibold text-2xl tracking-tight">Family Fun</span>
        </div>
    )
}

export default Logo