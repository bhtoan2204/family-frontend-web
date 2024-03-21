"use client"
import React from "react"
import LeftPanel from "./LeftPanel";

function ManageFamilyLayout({ children }: {
    children: React.ReactNode,

}) {
    return (
        <div >
            <div className="lg:flex lg:flex-row lg:justify-center">
                <div className="w-[18%] hidden lg:block bg-[#F8F8F8]">
                    <LeftPanel />
                </div>
                <div className="w-[82%] bg-[#F8F8F8]">
                    {children}
                </div>
                {/* Hiển thị LeftPanel chỉ khi kích thước màn hình lớn hơn hoặc bằng lg (large) breakpoint */}
            </div>
        </div>

    )
}


export default ManageFamilyLayout;