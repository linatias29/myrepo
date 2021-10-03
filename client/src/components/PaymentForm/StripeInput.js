
import React, { useRef, useImperativeHandle } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import {    

    CardCvcElement,
    CardNumberElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const StripeInput = ({ component: Component, inputRef, ...other }) => {
    const elementRef = useRef();
    useImperativeHandle(inputRef, () => ({
        focus: () => elementRef.current.focus
    }));

    return (
        <Elements stripe={stripePromise}>
        <Component onReady={element => (elementRef.current = element)} {...other} />
        </Elements>
    );
}

export default StripeInput