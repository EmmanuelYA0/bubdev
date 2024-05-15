// cinetpay.tsx
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://api-checkout.cinetpay.com/v2/payment';
const apikey = '14439896096636ad910f9802.93085131';

interface PaymentData {
    amount: number;
    currency: string;
    site_id: string;
    apikey: string;
    transaction_id : string;
    description: string;
    notify_url: string;
    return_url: string;
    channels: string[];
    lang?: string;
    metadata?: string;
}

interface PaymentResponse {
    data: {
        payment_url: string;
    };
}

interface PaymentStatus {
    status: string;
}

export const initializePayment = async (paymentData: PaymentData): Promise<AxiosResponse<PaymentResponse>> => {
    try {
        const response = await axios.post<PaymentResponse>(apiUrl, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apikey}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error initializing payment:', error);
        throw error;
    }
};

export const getPaymentStatus = async (transaction_id : string): Promise<AxiosResponse<PaymentStatus>> => {
    try {
        const response = await axios.get<PaymentStatus>(`${apiUrl}/${transaction_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apikey}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting payment status:', error);
        throw error;
    }
};