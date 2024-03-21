"use client"
import PlanComponent from '@/components/plans/plans/PlanComponent';
import axios from 'axios';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Plan } from '../type';
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import useFamilyRedirect from '@/hooks/useUserProfile';
import PlansLayout from '@/components/plans/plans/Layout';
import useScreenSize from '@/hooks/useScreenSize';
import useFetchAllFamily from '@/hooks/family/useFetchAllFamilyV2';

const UpgradePlans = () => {
    const [plans, setPlans] = React.useState<Plan[]>([])
    const [loading, setLoading] = React.useState<boolean>(true);
    const router = useRouter()
    const pathName = usePathname()
    const params = useParams();
    console.log("family id", params.familyId)
    const accessToken = localStorage.getItem('accessToken')
    const { userProfile } = useFamilyRedirect(accessToken!)
    const { families } = useFetchAllFamily(accessToken!)
    const { screenHeight, screenWidth } = useScreenSize()
    // useEffect(() => {

    //     if (families.loading == false && userProfile.loading == false) {
    //         console.log(families, userProfile)
    //         if (families.data.length == 0) {
    //             router.push('/manage/create')
    //         }
    //         else {
    //             if (families.data.every(family => family.id_family !== parseInt(params.familyId.toString()))) {
    //                 router.push(`/plans/${families.data[0].id_family}`)
    //             }
    //         }
    //     }
    // }, [families, params.familyId, router, userProfile])

    useEffect(() => {
        const handleFetchPlans = async () => {
            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) {
                router.push('/login')
                sessionStorage.setItem('redirect', pathName)
                return
            }
            console.log(accessToken)
            try {
                const response = await axios.get('/api/plans', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                setPlans(response.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                router.push('/login')
                sessionStorage.setItem('redirect', pathName)
            }
        }
        handleFetchPlans()
    }, [pathName, router])
    return (
        <PlansLayout>
            <div className=' w-full flex flex-col justify-center items-center flex-wrap'>
                <div className='text-3xl font-bold mt-10'>Choose the plan that’s right for your family</div>
                <div className='mb-12 mt-3 text-xl'>
                    Pay by the month cancel at any time.
                </div>
                <div className={` ${screenWidth < 1300 ? 'mx-[10%]' : 'mx-[3%]'} flex flex-wrap justify-center gap-7 mb-7 pb-52`}>


                    {
                        (loading == true || plans.length == 0) ? <ElasticDotLoading /> :
                            <React.Fragment>{plans.map((plan, index) => {

                                return <PlanComponent
                                    key={index}
                                    id_package={plan.id_package}
                                    name={plan.name}
                                    description={plan.description}
                                    price={plan.price}
                                    expired={plan.expired}
                                />
                            })}
                                <PlanComponent
                                    key={3}
                                    id_package={3}
                                    name={"Enterprise"}
                                    description={"For large teams or projects"}
                                    price={0}
                                    expired={0}
                                />
                            </React.Fragment>

                    }
                </div>
            </div>
        </PlansLayout>
    )
}



export default UpgradePlans