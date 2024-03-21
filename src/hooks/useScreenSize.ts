"use client"
import { useEffect, useState } from 'react';

interface ScreenSize {
    screenWidth: number;
    screenHeight: number;
}

const useScreenSize = (): ScreenSize => {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
};

export default useScreenSize;