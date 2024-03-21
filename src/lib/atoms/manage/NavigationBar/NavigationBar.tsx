import React, { ReactNode } from 'react'

interface NavigationBarProps {
    firstChild?: ReactNode;
    midChild?: ReactNode;
    lastChild?: ReactNode;
    show: boolean;
    className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ firstChild, midChild, lastChild, show, className }) => {
    const navClass = `bg-white border-b-2 p-4 ${show ? ' w-full z-10' : 'hidden'} ${className}`;

    return (
        <nav className={navClass}>
            <div className="max-w-8 mx-auto flex justify-between items-center">
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    {firstChild}
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-black  ">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="hidden lg:block">
                    <div className="flex items-center">
                        {midChild}
                    </div>
                </div>
                <div>
                    {lastChild}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar