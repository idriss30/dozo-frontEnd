import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import axios from "axios";
import CartContext from "../../Context/cart/cartContext";

export default function StripeCheckout() {
  // set all states related to the payment

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // call useStripe and useElements to give access to checkoutForm
  const stripe = useStripe();
  const elements = useElements();

  // get the products from the context

  const { products } = useContext(CartContext);

  // useEffect to get the secretClientFromBackend;
  useEffect(() => {
    let total = products.reduce((initial, item) => {
      return initial + item.quantity * item.price;
    }, 0);
    axios
      .post("http://localhost:5000/api/stripe/paymentIntent", total)
      .then((res) => {
        if (res.data.clientSecret) setClientSecret(res.data.clientSecret);
      })
      .catch((error) => console.log(error));
  }, []);

  // define a function to handle input change and display error
  const handleInputChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setIsDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  // define a function to handle the form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <CardElement id="card-element" onChange={handleInputChange} />
      <button disabled={processing || isDisabled || success} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, Refresh the page to pay again.
      </p>
    </form>
  );
}
