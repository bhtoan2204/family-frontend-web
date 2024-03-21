"use client"
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import { RootState, useAppDispatch } from '@/redux/store';
import { fetchUserProfile } from '@/redux/user/userProfile/userProfileSlice';
import LocalStorage from '@/store/local-storage/local-storage';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';

const LeftPanel = () => {
    const router = useRouter();
    const params = useParams()
    const userProfile = useSelector((state: RootState) => state.userProfile);

    // console.log(userProfile)
    // useEffect(() => {
    //     if (!accessToken) {
    //         router.push("/login");
    //         sessionStorage.setItem('redirect', pathName)
    //     }
    //     if (userProfile.data.id_user == "" || userProfile.data.id_user == null) {
    //         dispatch(fetchUserProfile({ accessToken: accessToken! })).unwrap().catch((error) => {
    //             sessionStorage.setItem('redirect', pathName)
    //             router.push("/login");
    //         })
    //     }
    // }, [accessToken, dispatch, pathName, router, userProfile.data.id_user])

    // const url = window.location.href;
    return <div className=" border-#616061">
        <div className='flex flex-row mx-4 mb-4 items-center pt-8 gap-4 '>
            <Image src="https://www.w3schools.com/howto/img_avatar.png" alt="logo" width={40} height={40} className='w-[20%] h-[20%] rounded-lg' />
            {/* <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className='w-[20%] h-[20%] rounded-lg' /> */}
            {
                userProfile.loading ? <ElasticDotLoading /> : <div>
                    <p className='text-[#616061] text-sm'>SIGNED IN AS</p>
                    <p className='text-xl font-medium'>{`${userProfile.data.firstname} ${userProfile.data.lastname}`}</p>

                </div>
            }
        </div>
        <div className="text-[#616061] m-4 ">
            <p className="mt-8 hover:cursor-pointer" onClick={() => {
                router.push("/manage")
            }}>MANAGE</p>
            <a className="flex flex-row gap-4 mt-5 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>


                <p className="hover:underline text-[#1d1c1d]">Home  </p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>

                <p className="hover:underline text-[#1d1c1d]">Create family</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <p className="hover:underline text-[#1d1c1d]">Account & profile</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                </svg>

                <p className="hover:underline text-[#1d1c1d]">Analytics</p>
            </a>
            <Link className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/${params.familyId}/about`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>


                <p className="hover:underline text-[#1d1c1d]">About this family</p>
            </Link>
        </div>
        <div className="text-[#616061] m-4 ">
            <p className="mt-8 hover:cursor-pointer" onClick={() => {
                router.push("/manage")
            }}>ADMINISTRATION</p>
            <a className="flex flex-row gap-4 mt-5 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>



                <p className="hover:underline text-[#1d1c1d]">Setting & permission  </p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>


                <p className="hover:underline text-[#1d1c1d]">Manage members</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>

                <p className="hover:underline text-[#1d1c1d]">Invitations</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>


                <p className="hover:underline text-[#1d1c1d]">Billing</p>
            </a>

        </div>
        <div className="text-[#616061] m-4 ">
            <p className="mt-8 hover:cursor-pointer" onClick={() => {
                router.push("/manage")
            }}>Other</p>
            <a className="flex flex-row gap-4 mt-5 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Tour </p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Help</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Pricing</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Contact</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Policies</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Our blogs</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#1d1c1d]">Sign out</p>
            </a>
            <a className="flex flex-row gap-4 mt-4 text-[#1d1c1d73] items-center" target="_self" href={`/manage/create`}>
                <p className="hover:underline text-[#e01e5a] ">Made with
                    <span className='ml-2 mr-2 text-[#1d1c1d73]'>&#9829;</span>
                    <span className=''> by Famfun</span>
                </p>
            </a>

        </div>
    </div>
}



export default LeftPanel