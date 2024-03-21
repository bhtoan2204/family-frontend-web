import React, { HTMLAttributes } from 'react'

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {


}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, className, ...rest } = props;
    return (
        <button {...rest} className={`w-36  py-3 border border-[#dddddd] rounded-lg text-sm font-medium ${className}`} >{children}</button>
    )
}

export default Button