"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import EditProfileModalV2 from './EditProfileModalV2';
import ChangeAccountTypeModalV2 from './ChangeAccountTypeV2';

import { useAppDispatch } from '@/redux/store';
import { fetchFamilyDetailAction } from '@/redux/family/familyDetail/getFamilyDetailSlice';
import axios from 'axios';
import { useParams } from 'next/navigation';
import LocalStorage from '@/store/local-storage';
import { Member } from '@/types/familyDetail';
import Image from 'next/image';


const LeftTable = ({ members, setModalContent, setShowModal }: { members: Member[], setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="w-full border-r border-[#DDDDDD] text-sm ml-4">
            <div className="py-4 border-b border-[#DDDDDD] text-[#1264a3] font-medium   ">Full name</div>
            {members.map((member, index) => (
                <div key={index} className="py-4 border-b border-[#DDDDDD]">
                    <LeftTableItem member={member} setModalContent={setModalContent} setShowModal={setShowModal} />
                </div>
            ))}
        </div>
    );
};
const LeftTableItem = ({ member, setModalContent, setShowModal }: { member: Member, setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [showDialog, setShowDialog] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowDialog(false);
                console.log("2")
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleClick = () => {
        setShowDialog((prev) => !prev);
        console.log("1");
        // if (!showDialog) {
        // }
    };

    return <div>
        <div className='flex flex-row gap-2 items-center justify-between mr-4'>
            <div className='flex flex-row gap-2 items-center'>
                
                <Image src="https://www.w3schools.com/howto/img_avatar.png" width={40} height={40} alt="a" className='w-5 h-5 rounded-md ' />
                <p className='font-medium'>{member.lastname}</p>

            </div>
            <div onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 hover:border cursor-pointer" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>
        </div>
        {showDialog && <ItemDialog member={member} setShowDialog={setShowDialog} setShowModal={setShowModal} setModalContent={setModalContent} />}
    </div>
}

const ItemDialog = ({ member, setShowDialog, setShowModal, setModalContent }: { member: Member, setShowDialog: any, setShowModal: any, setModalContent: any }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    const params = useParams()
    const handleDeleteMember = async (member: Member) => {
        try {
            await axios.delete('/api/family/member/delete', {
                data: {
                    id_family: parseInt(params["familyId"] as string),
                    id_user: member.id_user
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${LocalStorage.GetAccessToken()}`
                }
            })
            dispatch(fetchFamilyDetailAction.deleteMember(member.id_user.toString()))

            console.log("member deleted", member)
        } catch (error) {
            console.log("error", error)

        }
    }
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowDialog(false);
                console.log("2")
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setShowDialog]);
    if (member.isOwner) {

        return <div ref={modalRef} className='absolute bg-white border border-[#d5d5d5] rounded-sm w-[15%] h-28 flex flex-col  transition ease-in '>
            <div className=' w-full text-center h-1/2 flex items-center justify-center border-b border-[#d5d5d5]'>
                <p className='w-full hover:bg-[#1264a3] cursor-pointer hover:text-white' onClick={() => {
                    setShowDialog(false)
                    setShowModal(true)
                    setModalContent(<EditProfileModalV2 info={member} />)
                }}>Edit Profile</p>
            </div>

            <div className=' w-full text-center h-1/2 flex items-center justify-center'>
                <p className='w-full hover:bg-[#1264a3] cursor-pointer hover:text-white'>Transfer Ownership</p>
            </div>
        </div>
    }
    else {
        return <div ref={modalRef} className='absolute bg-white border border-[#d5d5d5] rounded-sm w-[15%] h-28 flex flex-col  transition ease-in '>
            <div className=' w-full text-center h-1/2 flex items-center justify-center border-b border-[#d5d5d5]'>
                <p className='w-full hover:bg-[#1264a3] cursor-pointer hover:text-white' onClick={() => {
                    setShowDialog(false)
                    setShowModal(true)
                    setModalContent(<ChangeAccountTypeModalV2 info={member} />)
                }}>Change account type</p>
            </div>

            <div className=' w-full text-center h-1/2 flex items-center justify-center'>
                <p className='w-full hover:bg-[#C10343] cursor-pointer hover:text-white text-[#C10343]' onClick={() => {
                    handleDeleteMember(member)
                }}>Deactivate Account</p>
            </div>
        </div>
    }
}

export default LeftTable