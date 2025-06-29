import { useEffect } from "react";
import { useCreateCheckoutSessionMutation } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CheckoutForm = ({ orderId }) => {
  const fetchClientSecret = useCallback(async () => {
    if (!orderId) {
      console.error('Missing orderId in CheckoutForm');
      return Promise.reject(new Error('Order ID is required'));
    }

    const token = await window.Clerk?.session?.getToken();
    
    return fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ orderId })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }
      return res.json();
    })
    .then(data => data.clientSecret);
  }, [orderId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;