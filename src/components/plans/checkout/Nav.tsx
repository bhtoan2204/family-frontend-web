import NavigationBar from '@/lib/atoms/NavigationBar/index'
import React from 'react'
import Logo from './Logo'
import MidChild from './MidChild';


const Nav = ({ showNav, pinned }: any) => {

    return (
        <NavigationBar
            show={true}
            firstChild={<Logo />}
            midChild={<MidChild />}
            className={`py-[1.05em] transition duration-75 ease-in w-full ${pinned ? "fixed" : null} ${showNav ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-full'}`}
        />
    );
}

export default Nav