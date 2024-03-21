import { Member } from '@/types/familyDetail';
import React from 'react'

const RightTable = ({ members }: { members: Member[] }) => {
    return (
        <div className="w-full text-sm mr-4 h-auto min-h-[33rem]">
            <div className='flex flex-row font-medium mr-4'>
                <div className="  px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0  w-[25%] ">Display name</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Email Address</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Phone Number</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Account Type</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Billing Status</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Authentication</div>
                <div className="px-10 py-4 whitespace-nowrap border-b  border-[#DDDDDD] flex-shrink-0 w-[25%] ">Expired Date</div>
            </div>
            {members.map((member, index) => (
                <React.Fragment key={index} >
                    <div className='flex flex-row mr-4'>
                        <div className="  px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.firstname} {member.lastname}</div>
                        {/* <div className="px-10 py-4 border-b border-[#DDDDDD]">{member.displayName}</div> */}
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.email}</div>
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.phone}</div>
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.accountType == null ? "-" : member.accountType}</div>
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%] ">{member.billingStatus == null ? "None" : member.billingStatus}</div>
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.authentication == null ? "Default" : member.authentication}</div>
                        <div className=" px-10 py-4 whitespace-nowrap border-b border-[#DDDDDD] flex-shrink-0  w-[25%]  ">{member.expiredDate == null ? "None" : member.expiredDate}</div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default RightTable