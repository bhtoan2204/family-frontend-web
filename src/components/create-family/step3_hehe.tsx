// import { updateCreateFamilySessionStorage } from '@/app/create-family/sessionStorage';
// import React, { useEffect } from 'react'

// interface Step3Props {
//     handleChangeStep: React.Dispatch<React.SetStateAction<number>>;
// }
// const ComponentStep3 = ({ handleChangeStep }: Step3Props) => {
//     // useEffect(() => {
//     //     updateCreateFamilySessionStorage({
//     //         ui_step: 3,

//     //     })
//     // }, [])
//     const handleNext = () => {
//         // handleNextStep();
//         handleChangeStep(4);
//     }
//     const handleSkip = () => {
//         // handleNextStep();
//         handleChangeStep(4);
//     }
//     return (
//         <React.Fragment>
//             <div className='text-4xl font-bold font-inter leading-[1.25] mb-4'>What&#39;s your family working on right now?</div>
//             <div className='mb-4'> This could be anything: Meeting, arrangement, just talking or a slogan of your family!    </div>
//             <input type="text" className='block w-full border border-solid border-[#d2d2d2] h-12 border-opacity-100 pl-4 rounded-lg mb-4' placeholder='Ex: Anything goes here' />

//             <div>

//                 <button className='bg-[#DDDDDD] px-10 py-2 mt-10 rounded-lg text-[#666566] mr-4' onClick={handleNext}>Next</button>
//                 <button className='bg-white  px-10 py-2 mt-10 rounded-lg text-[#666566]' onClick={handleSkip}>Skip this step </button>
//             </div>
//         </React.Fragment>
//     )
// }

// export default ComponentStep3