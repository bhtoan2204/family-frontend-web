import Image from "next/image"

const PaymentButton = ({ content, onClick, imgSrc }: any) => {
    return <div className='flex flex-row  w-full justify-between px-5 py-8 border border-[#dadada] mb-5 rounded-lg hover:cursor-pointer hover:transition hover:shadow-lg items-center font-medium' onClick={() => {
        if (onClick != null) {
            onClick()
        }
    }}>
        <div>{content}</div>
        <div className="border rounded-sm">
            <Image src={imgSrc} width={30} height={30} alt="img_payment" />
        </div>
    </div>
}
export default PaymentButton