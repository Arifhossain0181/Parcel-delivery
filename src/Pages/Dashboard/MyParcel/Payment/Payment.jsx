import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentCheckoutForm from './PaymentCheckoutForm';

const stripePromise = loadStripe('pk_test_51S5nrNF07KKYLVvVq7S98e3fWAs1p0bSo9QxICEzBtj8bFZRIJOUZLY6F405KOvCU3SVmpEF2deNY49owmBUS6G800exyrMRDC');
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentCheckoutForm></PaymentCheckoutForm>
        </Elements>
    );
};

export default Payment;