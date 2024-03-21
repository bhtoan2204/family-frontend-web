"use client"

import React, { useContext, useEffect, useState } from 'react';
import LeftTable from '@/components/manage-family/LeftTable';
import RightTable from '@/components/manage-family/RightTable';
import ManageFamilyLayout from '@/components/manage-family/Layout';
import { useRouter,  useParams, usePathname } from 'next/navigation';
import LocalStorage from '@/store/local-storage/local-storage';
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import InviteModalContentV2 from '@/components/manage-family/InviteModalContentV2';
import Modalv3 from '@/lib/atoms/Modal-v3';
import { ModalContext } from '@/providers/ModalProvider';
import Nav from '@/components/manage-family/Nav';
import useUserProfile from '@/hooks/useUserProfile';
import useFetchAllFamily from '@/hooks/family/useFetchAllFamilyV2';
import useFetchFamilyDetail from '@/hooks/family/useFetchFamilyDetailV2';



const ManageFamily = () => {
    const router = useRouter();
    const pathName = usePathname()
    const accessToken = LocalStorage.GetAccessToken();
    
    const { setShowModal, setModalContent, modalContent, showModal } = useContext(ModalContext)!;

    const params = useParams()

    // const { userProfile, loading: userProfileLoading, error: userProfileError } = useGetUserProfile(accessToken);

    const { userProfile } = useUserProfile(accessToken!);
    const { families } = useFetchAllFamily(accessToken!)
    const { familyDetail } = useFetchFamilyDetail(params["familyId"] as string, accessToken!)

    useEffect(() => {
        if (families.error == "Access token is not found" || userProfile.error == "Access token is not found" || familyDetail.error == "Access token is not found") {
            router.push("/login")
            sessionStorage.setItem('redirect', pathName)
        }
    }, [families.error, familyDetail.error, pathName, router, userProfile.error])



    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"

        } else {
            document.body.style.overflow = "visible"

        }
    }, [showModal]);



    if (userProfile.loading == true || families.loading == true) {
        return <ElasticDotLoading />
    }
    else if (familyDetail.error == "Family ID is not a number" || isNaN(parseInt(params["familyId"] as string))) {
        return <div className='h-[100vh] w-full '>
            <Modalv3 modalContent={modalContent} isModalOpen={showModal} onClose={() => {
                setShowModal(false)
                setModalContent(null)
            }} />
            <Nav showNav={true} />
            <div className='w-full h-[86%] flex  justify-center bg-blue-200'>
                <div className='w-[35%] h-[40%] mt-16 p-6 bg-white opacity-[0.9]'>
                    <div className='text-2xl flex flex-row gap-2 items-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                        There’s been a glitch…
                    </div>
                    <div>
                        We’re not quite sure what went wrong. You can go back, or try looking on our Help Center if you need a hand
                    </div>
                </div>
            </div>
            <div className=''>
                Footer goes her
            </div>
        </div>
    }
    else
        return (
            <React.Fragment>
                <Modalv3 modalContent={modalContent} isModalOpen={showModal} onClose={() => {
                    setShowModal(false)
                    setModalContent(null)
                }} />
                <Nav showNav={true} />
                <ManageFamilyLayout>
                    <div className='bg-[#F8F8F8] border-l'>
                        <div className='flex flex-row justify-between p-4 py-8 items-center bg-white'>
                            <div className='text-2xl font-semibold'>Manage family members</div>
                            <button className='px-8 py-2 bg-[#007A5A] text-white font-semibold rounded-md' onClick={() => {
                                setShowModal(true)
                                setModalContent(<InviteModalContentV2 />)
                            }}>Invite member</button>
                        </div>
                        <div className='flex flex-row justify-between p-4 items-center text-sm bg-[#F8F8F8]'>
                            <div className='flex flex-row  gap-4 items-center '>
                                {familyDetail != undefined ? <div>{familyDetail.data.members.length} members</div> : <div>...</div>}
                                <div className='text-[#1264a3]'>Export full member list</div>
                            </div>
                            <div>Filter here</div>
                        </div>

                        {
                            (familyDetail.loading || familyDetail == undefined) ? <ElasticDotLoading /> : <div className=''>
                                <div className=' w-full h-auto flex flex-row  bg-white'>
                                    <div className='w-[20rem] ml-4'>
                                        <LeftTable members={familyDetail.data.members} setModalContent={setModalContent} setShowModal={setShowModal} />
                                    </div>
                                    <div className=' overflow-auto'>
                                        <RightTable members={familyDetail.data.members} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </ManageFamilyLayout>

            </React.Fragment>

        );
};
export default ManageFamily;
