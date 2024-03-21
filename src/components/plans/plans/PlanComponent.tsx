"use client"
import { Plan } from '@/app/plans/type'
import { formatCurrency } from '@/util/formatCurrency'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

interface PlanProps {
    id?: number,
    title?: String,
    description: String,
    image?: String,
    yearlyBilled?: number,
    monthlyBilled: number,
    plansAbbrevation: String,
    benefits?: String[],
    bg_color?: String
    purchased?: boolean
}


const PlanComponent: React.FC<Plan> = ({ id_package, name, price, description, expired }: Plan) => {
    const router = useRouter();
    const params = useParams()
    const familyId = params.familyId
    // const familyId = params('familyId')
    const handleClick = () => {
        router.push(`/plans/${familyId}/checkout/?p=${name.toLowerCase()}`)
    }
    return <div className='w-[30%]  flex flex-col  rounded-xl mb-10'>
        <div className={`flex flex-row min-h-[40%]   bg-[#0B4C8C] p-6  rounded-t-lg `}>
            <div className='w-[70%]'>

                <div className='text-white font-bold text-[1.8rem]'>{name}</div>
                <div className='text-white  text-[0.9em]'>{description}</div>
            </div>
            <div className='flex justify-end w-[30%] '>
                {
                    id_package == 1 ? <Image src={"/small_features_standard-0ba5f8c.png"} alt='img_plan' className='w-[5rem] h-[5rem] ' width={30} height={30} /> : id_package == 2 ? <Image width={30} height={30} src={"/small_features_plus-b62f316.png"} alt='img_plan' className='w-[5rem] h-[5rem] ' /> : <Image width={30} height={30} src={"/small_features_enterprise-e933a0a.png"} alt='img_plan' className='w-[5rem] h-[5rem] ' />
                }
            </div>
        </div>
        <div className='p-6 pt-5 shadow-2xl '>
            <div className='max-h-[10%] h-auto'>
                {
                    price != 0 ? <React.Fragment>
                        <div className='font-bold text-[1.8rem]'>{formatCurrency(price)}</div>
                        <div className='text-[0.8em]'>per person/{expired.toString()} month</div>
                    </React.Fragment> : <div className='font-bold text-[1.8rem]'>Contact sale</div>
                }
            </div>


            <div className='mt-10 text-[1em] font-semibold '>All the benefits:
                <div className='pb-7 font-normal text-sm pt-3'>

                    <li className='mb-2 type' style={{ listStyleType: "none" }}>
                        <span role="img" aria-label="check" className='font-semibold text-[#007A5A] mr-1'>&#10003;</span> Up to 5 projects, 50GB storage, Up to 10 users

                    </li>
                    <li className='mb-2' style={{ listStyleType: "none" }}>
                        <span role="img" aria-label="check" className='font-semibold text-[#007A5A] mr-1'>&#10003;</span> Up to 5 projects, 50GB storage, Up to 10 users

                    </li>
                    <li className='mb-2' style={{ listStyleType: "none" }}>
                        <span role="img" aria-label="check" className='font-semibold text-[#007A5A] mr-1'>&#10003;</span> Up to 5 projects, 50GB storage, Up to 10 users

                    </li>
                </div>
            </div>
            <div className='  mb-7'>
                <button className='py-5 bg-[#007A5A] text-white border rounded-sm w-full font-semibold hover:bg-[#2b6c5b] transition text-[1em]' onClick={handleClick} >Upgrade Now</button>
                {/* <button className='py-5 bg-[#007A5A] text-white border rounded-sm w-full font-semibold hover:bg-[#2b6c5b] transition text-[1em]' onClick={handleClick} disabled={purchased == true}>{purchased == true ? <span>&#10003;</span> : "Upgrade Now"}</button> */}
            </div>
        </div>



    </div>
}

export default PlanComponent