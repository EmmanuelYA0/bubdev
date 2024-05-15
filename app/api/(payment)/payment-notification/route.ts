// app/api/payment-notification/route.ts
import { getPaymentStatus } from '@/components/payment/cinetPay/cinetpay';
import { NextRequest, NextResponse } from 'next/server';


interface RequestBody {
  transaction_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const transaction_id = body.transaction_id;
    const paymentStatus = await getPaymentStatus(transaction_id);

    // Process the payment status and update your application accordingly
    if (paymentStatus.data.status === 'ACCEPTED') {
      // Payment successful
      // Update order status, send confirmation email, etc.
      console.log('Payment successful');
    } else if (paymentStatus.data.status === 'REFUSED') {
      // Payment canceled
      console.log('Payment canceled');
    }

    return NextResponse.json({ message: 'Payment notification received' });
  } catch (error) {
    console.error('Error handling payment notification :', error);
    return NextResponse.json({ message: 'Error handling payment notification' }, { status: 500 });
  }
}