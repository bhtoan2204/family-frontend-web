"use client";
import React, { useContext, useEffect, useState } from "react";
import ManageFamilyLayout from "@/components/manage-family/Layout";
import Nav from "@/components/manage-family/Nav";
import Modalv3 from "@/lib/atoms/Modal-v3";
import { ModalContext } from "@/providers/ModalProvider";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import useFetchAllFamily from "@/hooks/family/useFetchAllFamilyV2";
import LocalStorage from "@/store/local-storage";
import useUserProfile from "@/hooks/useUserProfile";

const AboutFamilyPage = () => {
  const router = useRouter();
  const pathName = usePathname()
  const accessToken = LocalStorage.GetAccessToken();
  const { setShowModal, setModalContent, modalContent, showModal } = useContext(ModalContext)!;
  const [activeTab, setActiveTab] = useState('overview');
  const { userProfile } = useUserProfile(accessToken!);
  const { families } = useFetchAllFamily(accessToken!)
  const params = useParams();
  const sparams = useSearchParams();
  console.log(sparams)

  useEffect(() => {
    if (families.error == "Access token is not found") {
      router.push("/login");
      sessionStorage.setItem("redirect", pathName);
    }
  }, [families.error, pathName, router])

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    console.log(hash)
    if (hash !== 'overview' && hash !== 'admins' && hash !== 'retentions') {
      setActiveTab('overview');
    } else {
      setActiveTab(hash);
    }
  }, []);



  if (isNaN(parseInt(params.familyId as string))) {
    return <div>Family ID is not a number</div>;
  }
  return (
    <div className="">
      <Modalv3 modalContent={modalContent} isModalOpen={showModal} onClose={() => {
        setShowModal(false)
        setModalContent(null)
      }} />
      <Nav showNav={true} />
      <ManageFamilyLayout>
        <div className="h-[50%] min-h-[50%] ml-9">
          <div className="mt-16 mb-10 text-2xl flex flex-row gap-2 items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-600 font-semibold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>

            <p className="font-semibold">About this family </p>
          </div>
          <div className="w-[50%] flex flex-row ">

            <Link href={`#overview`} className={`py-4 min-w-[20%] text-center ${activeTab === 'overview' ? "bg-white border-b-white border-t border-l border-r" : "text-[#1264a3]"} font-semibold hover:underline`} onClick={() => {
              setActiveTab('overview')
            }} > Overview</Link>
            <Link href={`#admins`} className={`py-4 min-w-[20%] text-center ${activeTab === 'admins' ? "bg-white border-b-white border-t border-l border-r " : "text-[#1264a3]"} font-semibold w-auto px-4 hover:underline`} onClick={
              () => {
                setActiveTab('admins')
              }

            }> Admins & owner</Link>
            <Link href={`#retentions`} className={`py-4 min-w-[20%] text-center ${activeTab === 'retentions' ? "bg-white border-b-white border-t border-l border-r" : "text-[#1264a3]"} font-semibold hover:underline `} onClick={() => {
              setActiveTab('retentions')
            }}> Retention</Link>

          </div>
          <div className=" h-[100%] pt-10  bg-white  w-[50%] border-l border-r border-b shadow-sm">

            <div className=" border-l w-full">
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'admins' && <Admins />}
              {activeTab === 'retentions' && <Retention />}
            </div>
          </div>
        </div>
      </ManageFamilyLayout>
    </div>
  );
};
const Overview = () => {
  return (
    <div className="  w-[50%] ml-5">
      <h2 className="text-xl font-semibold mb-2">Overview</h2>
      {/* Nội dung của component Overview */}
    </div>
  );
};
const Admins = () => {
  return (
    <div className="  w-[50%] ml-5">
      <h2 className="text-xl font-semibold mb-2">Admins & Owner</h2>
      {/* Nội dung của component Admins */}
    </div>
  );
};
const Retention = () => {
  return (
    <div className=" w-[50%] ml-5">
      <h2 className="text-xl font-semibold mb-2">Retention</h2>
      {/* Nội dung của component Retention */}
    </div>
  );
};
export default AboutFamilyPage;
