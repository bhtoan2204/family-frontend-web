import React, { HTMLAttributes } from 'react'

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {


}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <button {...rest} className={`w-20  py-2 border border-[#dddddd] rounded-lg mb-4 text-sm font-medium  ${className}`} >{children}</button>
    )
}

export default Button