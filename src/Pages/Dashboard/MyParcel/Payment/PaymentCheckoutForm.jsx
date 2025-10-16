import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuthhooks from "../../../../Hooks/UseAuthhooks";
import toast from "react-hot-toast";

const PaymentCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuthhooks();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  // 🔹 Fetch parcel details
  const { data: ParcelInfo, isLoading } = useQuery({
    queryKey: ["Parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Parcel/${id}`);
      return res.data;
    },
    enabled: !!id, // only fetch when id exists
  });

  // 🔹 Calculate amount
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (ParcelInfo && ParcelInfo.cost) {
      setAmount(Number(ParcelInfo.cost));
      return;
    }

    if (ParcelInfo) {
      const computeCost = (p) => {
        try {
          const senderCenter = p.sender_center;
          const receiverCenter = p.receiver_center;
          const type = p.type; // 'document' or 'non-document'
          const weight = Number(p.weight || 0);

          if (type === "document") {
            return senderCenter === receiverCenter ? 60 : 80;
          }

          // non-document
          if (weight <= 3) {
            return senderCenter === receiverCenter ? 110 : 150;
          }

          const extraKg = Math.max(0, weight - 3);
          if (senderCenter === receiverCenter) {
            return 110 + extraKg * 40;
          }
          return 150 + extraKg * 40 + 40; // outside city extra
        } catch (e) {
          console.error("Failed to compute cost:", e);
          return 0;
        }
      };

      const computed = computeCost(ParcelInfo);
      setAmount(Math.max(0, computed)); // ensure non-negative
    }
  }, [ParcelInfo]);

  const amountcents = Math.round(amount * 100);

  // 🔹 Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    if (!amountcents || amountcents <= 0) {
      setError("Invalid payment amount. Cannot process payment.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Create Payment Intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amountcents,
        id,
      });

      const clientSecret = data.clientSecret;
      if (!clientSecret) throw new Error("Missing client secret from backend");

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // Step 3: Record payment in backend
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          parcelId: id,
          amount,
          transactionId: result.paymentIntent.id,
          email: user.email,
          status: "succeeded",
          createdAt: new Date(),
        };
        // Try to save payment on backend, but navigate back regardless so user returns to dashboard
        try {
          const paymentRes = await axiosSecure.post("/payment-success", paymentData);
          if (paymentRes.data.historySaved) {
            toast.success("Payment recorded successfully");
          } else {
            toast.success("Payment succeeded — but server did not return historySaved");
          }
        } catch (saveErr) {
          console.error("Failed to save payment on server:", saveErr?.response || saveErr);
          toast.error("Payment succeeded but saving history failed on server");
        } finally {
          // Always refresh parcel data and navigate back to MyParcel
          queryClient.invalidateQueries(["Parcel", id]);
          navigate("/dashboard/MyParcel");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.error || err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!ParcelInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Loading parcel info...
      </div>
    );
  }

  if (ParcelInfo && amount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Parcel cost not found or invalid!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-2xl shadow-md w-full max-w-md p-6"
      >
        <h3 className="text-lg font-semibold text-center">
          Pay for Parcel #{id}
        </h3>
        <p className="text-center text-gray-500 mb-2">
          Total: <span className="font-semibold">${amount.toFixed(2)}</span>
        </p>

        <CardElement className="border p-3 rounded-md" />

        <button
          className="btn btn-primary w-full mt-3"
          type="submit"
          disabled={!stripe || loading || amountcents <= 0}
        >
          {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </button>

        {error && (
          <p className="text-red-600 text-center text-sm mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default PaymentCheckoutForm;
