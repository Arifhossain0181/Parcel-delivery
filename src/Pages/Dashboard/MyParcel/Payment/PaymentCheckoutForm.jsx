import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { CardElement, useStripe, useElements } 
from "@stripe/react-stripe-js";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import  UseAxiosSecure from '../../../../Hooks/UseAxiosSecure'

const PaymentCheckoutForm = () => {
    
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure =  UseAxiosSecure()


    const [error,seterror] = useState('')
    const {id} = useParams()
    console.log(id)
 
     const  {  data:ParcelInfo=[]} = useQuery({
        queryKey:['Parcel',id],
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/Parcel/${id}`)
            return res.data
        }
     })
     console.log(ParcelInfo)
     const amount = ParcelInfo.cost ;
     const amountcents = amount*100;
     console.log(amountcents)

     
  const handlesubimit =async (e) => {
    e.preventDefault();
    if(!stripe || !elements){
        return
    }
    const card = elements.getElement(CardElement)
    if(!card){
        return
    }
   const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: 'card',
  card,
 
});

    if(error){
        seterror(error.message)
        console.log(error)

    }
    else{
        seterror('')
        console.log('Payment ',paymentMethod)
    }

     // setP 2 create Payment intent
     const res = await axiosSecure.post(`/create-payment-intent` ,{
        amountcents,
        id,
     })
     const clientSecret = res.data.clientSecret
     const result = await stripe.confirmCardPayment(clientSecret ,{
        payment_method:{
            card: elements.getElement(CardElement),
            billing_details:{
                name:"arif"
            }
        }
     });
     if(result.error){
        console.log(result.error.message)
     }
     else{
        if(result.paymentIntent.status === 'succeeded'){
            console.log('djkfjdkfj')
            console.log(result)

        }
     }


     console.log('amithek hiose',res)

  };
  return (
    <div>
      <form onSubmit={handlesubimit} className="space-y-4 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
        <CardElement className=" p-2  ">
         
        </CardElement>
         <button className="btn btn-primary w-full" type="submit" disabled={!stripe}>
            Pay ${amount 

            }
          </button>
          {
            error && <h4 className=" text-red-800">{error}</h4>
          }
      </form>
    </div>
  );
};

export default PaymentCheckoutForm;
