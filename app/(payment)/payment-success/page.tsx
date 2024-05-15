import { CheckCircle } from 'lucide-react'
import React from 'react'

const PaymentSuccess = () => {
    return (
        <div className='flex items-center justify-center h-screen text-3xl gap-3 text-gray-500'>
            <CheckCircle stroke='green' className=' h-8 w-8 ' />
            Payment Ended Successfully
        </div>
    )
}

export default PaymentSuccess