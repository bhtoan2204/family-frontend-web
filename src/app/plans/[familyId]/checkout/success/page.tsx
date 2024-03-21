"use client"
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { formatCurrency } from '@/util/formatCurrency';
import useUserProfile from '@/hooks/useUserProfile';
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import LocalStorage from '@/store/local-storage';
const paymentInfo = {
  paymentType: "Zalo Pay",
  plansAbbrevation: "basic",
  plansName: "Basic Premium Plan",
  phone: "0987654333",
  email: "klong100000@gmail.com",
  amount: 500000,
  familyName: "KIMLONG",
  familyId: "KIMLONG"
}

const SuccessPayment = () => {
  const router = useRouter();
  const sparams = useSearchParams();
  const params = useParams()
  const [amount, setAmount] = React.useState<number>(0)
  const accessToken = LocalStorage.GetAccessToken();
  const { userProfile } = useUserProfile(accessToken!)
  const p = sparams.get('p')
  console.log(p)
  useEffect(() => {
    if (!userProfile.loading) {
      const familyId = params.familyId
      const amount = sparams.get('amount')
      setAmount(parseInt(amount!))
      //http://localhost:3000/plans/92/checkout/success?p=Basic&amount=200000&appid=2553&apptransid=240320_512819&bankcode=&checksum=518c7a84d547029920c298636d4e406df555c4be88758673a5446c6859de3822&discountamount=30000&pmcid=38&status=1
      const timer = setTimeout(() => {
        router.push(`/plans/${familyId}`);
      }, 3000);

      // Cleanup
      return () => clearTimeout(timer);
    }
  }, [params.familyId, router, sparams, userProfile.loading])
  if (userProfile.loading) {
    return <ElasticDotLoading />
  }
  return (
    <div className="flex flex-col justify-center items-center h-full mt-10 ">
      <div className="bg-white p-8 rounded  w-[33%] shadow-lg ">
        <h2 className="text-xl font-bold mb-4 text-center text-[#2BB876] ">Payment Successful!</h2>
        <div className='flex flex-row justify-between mb-5'>
          <p>Payment type</p>
          <p className='font-semibold'>{paymentInfo.paymentType}</p>
        </div>
        <div className='flex flex-row justify-between mb-5'>
          <p>Plans</p>
          <p className='font-semibold'>{paymentInfo.paymentType}</p>
        </div>
        <div className='flex flex-row justify-between mb-5'>
          <p>Phone number</p>
          <p className='font-semibold'>{userProfile.data.phone}</p>
        </div>
        <div className='flex flex-row justify-between mb-5'>
          <p>Email</p>
          <p className='font-semibold'>{userProfile.data.email}</p>
        </div>
        <div className='flex flex-row justify-between mb-5'>
          <p className='font-semibold'>Amount paid</p>
          <p className='font-semibold'>{formatCurrency(amount)}</p>
        </div>
      </div>
      <div className='text-sm mt-10 text-gray-500'>
        We will be redirect you soon...
      </div>
    </div>
  )
}

export default SuccessPayment