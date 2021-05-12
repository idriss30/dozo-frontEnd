import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./checkout";
import { useState } from "react";

const CheckoutState = () => {
  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE)
  );

  return (
    <>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </>
  );
};

export default CheckoutState;
