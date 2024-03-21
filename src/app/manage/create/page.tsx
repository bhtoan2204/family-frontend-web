"use client"
import React, { useEffect, useState } from 'react'
import ComponentStep1 from '@/components/create-family/step1';
import ComponentStep2 from '@/components/create-family/step2';
// import ComponentStep3 from '@/components/create-family/step3_hehe';

import Select, { StylesConfig } from 'react-select';
import ComponentStep3 from '@/components/create-family/step3';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ComponentFinalStep from '@/components/create-family/step_final';
import ManageFamilyLayout from '@/components/manage-family/Layout';

const steps = ["setup_familyname", "setup_name_and_photo", "setup_coworkers", "setup_invite"];

const CreateFamilyNew = () => {
    const [step, setStep] = useState<number>(1);
    const [familyName, setFamilyName] = useState<String>('')
    const [photo, setPhoto] = useState<String>('');
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [familyContacts, setFamilyContacts] = useState<String[]>([]);
    const [familyId, setFamilyId] = useState<String>('');
    // useEffect(()=>{
    //     setDefaultNav(false);
    // },[])
    
    const showStep = () => {
        return (
            <React.Fragment>
                {/* {step === 0 && <ReactLoading type={"balls"} color={"#ffffff"} height={'20%'} width={'20%'} />} */}
                {step === 1 && <ComponentStep1 familyName={familyName} setFamilyName={setFamilyName} handleChangeStep={setStep} setFamilyId={setFamilyId} />}
                {step === 2 && <ComponentStep2 photo={photo} photoFile={photoFile} setPhoto={setPhoto} setPhotoFile={setPhotoFile} handleChangeStep={setStep} />}
                {/* {step === 3 && <ComponentStep3 handleChangeStep={setStep} />} */}
                {step === 3 && <ComponentStep3 familyContacts={familyContacts} setFamilyContacts={setFamilyContacts} handleChangeStep={setStep} />}
                {step === 4 && <ComponentFinalStep familyId={familyId} />}
            </React.Fragment>
        )
    }


    return (
        <ManageFamilyLayout>
            <div className='pl-14 pt-14  h-auto min-h-full bg-white min-w-full w-auto'>
                {step != 4 && <div className='text-sm text-[#8D8B8F] mb-5'>Step {step} of 3</div>}
                {showStep()}
            </div>
        </ManageFamilyLayout>


    )
}

export default CreateFamilyNew