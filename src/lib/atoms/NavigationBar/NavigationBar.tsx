// import React, { ReactNode } from 'react'

// interface NavigationBarProps {
//     firstChild?: ReactNode;
//     midChild?: ReactNode;
//     lastChild?: ReactNode;
//     show: boolean;
//     className?: string;
// }

// const NavigationBar: React.FC<NavigationBarProps> = ({ firstChild, midChild, lastChild, show, className }) => {
//     const navClass = `bg-white border-b-2  ${show ? ' top-0 w-full z-10 opacity-100 -translate-y-0' : 'hidden opacity-0 -translate-y-full'} ${className}`;

//     return (
//         <nav className={`bg-white border-b-2  z-10  ${className}`}>
//             <div className="  items-center flex flex-row justify-between">
//                 <div className="max-w-[33%] flex justify-start items-center flex-shrink-0 text-black mr-6">
//                     {firstChild}
//                 </div>
//                 <div className="max-w-[33%]  items-center flex-shrink-0 text-black mr-6">
//                     {midChild}
//                     {/* <p>Mid Item</p> */}
//                 </div>
//                 <div className="max-w-[33%] flex justify-start items-center flex-shrink-0 text-black mr-6">
//                     {lastChild}

//                 </div>

//             </div>
//         </nav>
//     );
// }

// export default NavigationBar
import React, { ReactNode } from 'react'

interface NavigationBarProps {
    firstChild?: ReactNode;
    midChild?: ReactNode;
    lastChild?: ReactNode;
    show: boolean;
    className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ firstChild, midChild, lastChild, show, className }) => {
    return (
        <nav className={`bg-white border-b-2 z-10 ${className}`}>
            <div className="items-center flex flex-row justify-between">
                <div className="max-w-[33%] flex justify-start items-center flex-shrink-0 text-black mr-6">
                    {firstChild}
                </div>
                <div className="max-w-[33%] items-center justify-start align-middle flex-shrink-0 text-black mr-14">
                    {midChild}
                </div>
                <div className="max-w-[33%]  flex justify-start items-center flex-shrink-0 text-black mr-6">
                    {lastChild}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
