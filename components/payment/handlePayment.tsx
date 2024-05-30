// components/payment/handlePayment.tsx
"use client";

import React, { useState } from "react";
import { initializePayment } from "./cinetPay/cinetpay";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";

interface PaymentData {
  amount: number;
  currency: string;
  transaction_id: string;
  description: string;
  site_id: string;
  apikey: string;
  customer_id: string;
  customer_name: string;
  customer_surname: string;
  notify_url: string;
  return_url: string;
  channels: string[];
  lang?: string;
  metadata?: string;
}

const PaymentPage = () => {
  const { cartTotalAmount } = useCart();

  const Discount = 0;

  const getCartTotal = (cartTotalAmount: number, Discount: number) => {
    const total = cartTotalAmount + cartTotalAmount * 0.18 - Discount;
    return total;
  };

  const cartAmount = getCartTotal(cartTotalAmount, Discount);

  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: cartAmount,
    currency: "XOF",
    site_id: "5871976",
    apikey: "14439896096636ad910f9802.93085131",
    transaction_id: Math.floor(Math.random() * 100000000).toString(),
    description: "Payment for your product or service",
    customer_id: "001",
    customer_name: "John",
    customer_surname: "Doe",
    notify_url: "http://localhost:3000/api/payment-notification",
    return_url: "http://localhost:3000/payment-success",
    channels: ["MOBILE_MONEY", "WALLET"],
    lang: "FR",
  });

  const handlePayment = async () => {
    try {
      const response = await initializePayment(paymentData);
      // Redirect the user to the payment page provided by CinetPay
      window.location.href = response.data.data.payment_url;
    } catch (error) {
      console.error("Error initializing payment:", error);
      // Handle error
    }
  };

  return (
    <>
      <Button
        onClick={handlePayment}
        className="block rounded bg-pourpre px-5 py-3 text-sm text-gray-100 transition hover:bg-pink-900"
      >
        Commander
      </Button>
    </>
  );
};

export default PaymentPage;
