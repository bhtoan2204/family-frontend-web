"use client"
import { useSearchParams, useParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import PaymentButton from '@/components/plans/checkout/PaymentButton';
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import LocalStorage from '@/store/local-storage';
import { fetchUserProfile } from '@/redux/user/userProfile/userProfileSlice';
import { fetchAllFamily } from '@/redux/family/getAllFamily/getAllFamilySlice';
import useUserProfile from '@/hooks/useUserProfile';
import { Plan } from '../../type';
import { FamilyDetail } from '@/redux/family/familyDetail/type';
import { formatCurrency } from '@/util/formatCurrency';
import PlansLayout from '@/components/plans/plans/Layout';
import CheckoutPlanLayout from '@/components/plans/checkout/Layout';
import useGetFamilyDetail from '@/hooks/family/useGetFamilyDetail';
import usePaymentMethods from '@/hooks/payment/usePaymentMethods';




const PlanCheckout = () => {
    const router = useRouter()
    const params = useParams();
    const pathName = usePathname()
    const sparams = useSearchParams()

    const [planInfo, setPlanInfo] = useState<Plan>()


    const accessToken = LocalStorage.GetAccessToken()
    const { userProfile } = useUserProfile(accessToken!)
    const { familyDetail, loading, error } = useGetFamilyDetail(accessToken, parseInt(params.familyId as string))
    const { paymentMethod, loading: loadingPaymentMethod, error: errorPaymentMethod } = usePaymentMethods(accessToken)

    // useEffect(() => {
    //     console.log(families, userProfile)
    // }, [families, userProfile])


    useEffect(() => {
        console.log(sparams.get('p'))
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
                response.data.data.map((plan: Plan) => {
                    if (plan.name.toLowerCase() === sparams.get('p')) {
                        setPlanInfo(plan)
                        console.log(plan)
                    }
                })
                // setPlanInfo(data.data)
                // console.log(data)
            } catch (error) {
                console.log(error)
                router.push('/login')
                sessionStorage.setItem('redirect', pathName)
            }
        }
        handleFetchPlans()
    }, [pathName, router, sparams])

    const handleZaloPayV2 = async (items: any, price: number, order_info: string, redirect_url: string) => {
        try {

            const response = await axios.post('http://localhost:3000/api/zlpay', {
                items: items,
                amount: price,
                description: order_info,
                redirect_url: redirect_url

            });
            window.open(response.data.order_url, '_self');


        } catch (error) {
            console.error('Error fetching ZaloPay ', error);
        }
    }
    const handleVnPay = async (id_package: number, id_family: number, amount: number, language: "vn", method: string, token: string) => {
        try {

            const response = await axios.post('http://localhost:3000/api/vnpay', {
                id_package: id_package,
                id_family: id_family,
                amount: amount,
                language: language,
                method: method
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            );
            window.open(response.data.order_url, '_self');


        } catch (error) {
            console.log(error)
            console.error('Error fetching Vnpay ', error);
        }
    }
    if (loading || familyDetail == undefined) {
        return <ElasticDotLoading />
    }
    return (
        <CheckoutPlanLayout>
            <div>
                <div className='h-auto flex flex-row justify-center'>
                    <div className=' w-3/4 mt-4'>
                        {planInfo == null ? <ElasticDotLoading /> : <div className='grid grid-cols-2'>
                            <div className='flex flex-col w-full'>
                                <div className='pt-6 pl-4'>
                                    {
                                        loadingPaymentMethod || paymentMethod == undefined ? <ElasticDotLoading /> : <React.Fragment>
                                            <PaymentButton content={"Thanh Toán Với Zalo Pay"} onClick={async () => {
                                                await handleZaloPayV2(
                                                    [
                                                        {
                                                            id: planInfo.id_package,
                                                            name: planInfo.name,
                                                            amount: planInfo.price * familyDetail.members.length,
                                                        }
                                                    ],
                                                    planInfo.price * familyDetail.members.length,
                                                    planInfo.name,
                                                    `http://localhost:3000/plans/${familyDetail.id_family}/checkout/success?p=${planInfo.name}`,

                                                )
                                            }} imgSrc={paymentMethod[1]?.url_image} />
                                            <PaymentButton content={"Thanh Toán Với VN Pay"} onClick={async () => {
                                                await handleVnPay(
                                                    planInfo.id_package,
                                                    familyDetail.id_family,
                                                    planInfo.price * familyDetail.members.length,
                                                    "vn",
                                                    "vnpay",
                                                    accessToken!
                                                )
                                                console.log("data")
                                            }} imgSrc={paymentMethod[0]?.url_image} />
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                            <div className='border m-6 w-9/12'>
                                <div className='px-8 py-6 bg-[#397097] text-white grid grid-cols-2 text-lg font-semibold'>
                                    <div>
                                        <div>{planInfo!.name}</div>
                                        <div className='font-normal text-sm mt-2'>Billed every {planInfo.expired} {planInfo.expired > 1 ? "months" : "month"}</div>
                                    </div>
                                    <div className='flex flex-col justify-center items-end'>
                                        <div className='p-2 border font-medium'>VND</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='px-8 py-6 bg-white shadow-sm  text-sm font-normal '>
                                        <div className='flex flex-row justify-between mb-4'>
                                            <div>{formatCurrency(planInfo.price)} x {familyDetail.members.length} members x {planInfo.expired} month</div>
                                            <div>{formatCurrency(planInfo.price * familyDetail.members.length)}</div>
                                        </div>

                                        <div className='mb-3'>
                                            You’re upgrading for every active member of your team. If new people join or inactive members become active, they’ll be added to your next bill.
                                        </div>
                                        <hr />
                                        <div className='flex flex-row justify-between mt-3 mb-3'>
                                            <div>Sales tax</div>
                                            <div>{formatCurrency(0)}</div>
                                        </div>
                                        <hr />
                                        <div className='flex flex-row justify-between mt-5 font-semibold text-base'>
                                            <div >Due today</div>
                                            <div>{formatCurrency(planInfo.price * familyDetail.members.length + 0)}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </CheckoutPlanLayout>
    )
}

export default PlanCheckout