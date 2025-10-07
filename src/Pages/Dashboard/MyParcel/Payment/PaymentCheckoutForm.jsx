import React, { useState } from "react";

import { useParams, useNavigate } from "react-router";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  useQuery,useQueryClient

} from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuthhooks from "../../../../Hooks/UseAuthhooks";
const PaymentCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuthhooks();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [error, seterror] = useState("");
  const { id } = useParams();
  console.log(id);

  const { data: ParcelInfo = [] } = useQuery({
    queryKey: ["Parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Parcel/${id}`);
      return res.data;
    },
  });
  console.log(ParcelInfo);
  const amount = ParcelInfo.cost;
  const amountcents = amount * 100;
  console.log(amountcents);

  const handlesubimit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    /// validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      seterror(error.message);
      console.log(error);
    } else {
      seterror("");
      console.log("Payment ", paymentMethod);
    }

    // setP 2 create Payment intent from backend
    const res = await axiosSecure.post("/create-payment-intent", {
      amountcents,
      id,
    });
    console.log("Backend response:", res.data); // add this for debugging
    const clientSecret = res.data.clientSecret; //  must match backend spelling

    // steP3 confirm Payment eikhane tk katbe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,

          email: user.email,
        },
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      seterror("");


      if(result.paymentIntent.status === 'succeeded'){
    const Paymentdata = {
      parcelId: id,
      amount,
      transactionId: result.paymentIntent.id,
      email: user.email,
      status: "succeeded",
      createdAt: new Date(),
    };

    const Paymentres = await axiosSecure.post('/payment-success', Paymentdata);
    if(Paymentres.data.historySaved){
      console.log('Payment successfully saved');

      // ✅ Refetch Parcel data so status shows "paid"
      queryClient.invalidateQueries(['Parcel', id]);

      // ✅ Redirect to MyParcel dashboard
      navigate('/dashboard/MyParcel');
    }
}

    }

    console.log("amithek hiose", res);
  };
  return (
    <div>
      <form
        onSubmit={handlesubimit}
        className="space-y-4 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className=" p-2  "></CardElement>
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <h4 className=" text-red-800">{error}</h4>}
      </form>
    </div>
  );
};

export default PaymentCheckoutForm;
