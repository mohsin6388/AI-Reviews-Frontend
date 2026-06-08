import React , {useState, useEffect} from 'react'
import './PaymentPage.css';
import api from "../api";
import { API } from "../utils/api"

const PaymentPage = ({user}) => {

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const token = localStorage.getItem("rb_token");

        const { data } = await api.get(
          `/payment/check-payment/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(data);

        setPaymentInfo(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchPaymentStatus();
    }
  }, [user]);

  const handlePayment = async () => {
    try {

      const token = localStorage.getItem("rb_token");

      const { data } = await api.post(
        "/payment/create-order",
        {
          user_id: user.id,
          // amount: 999,
          plan_id: "Premium",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(data); /// remove after testing

      const options = {
        key: "rzp_test_SrDMwFfEgXgFpL",

        amount: data.order.amount,

        currency: data.order.currency,

        order_id: data.order.id,

        name: "Review Booster",

        description: "Premium Plan",

        handler: async function (response) {
          console.log(response); /// remove afetr testing
          await api.post("/payment/verify-payment", response, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Payment Successful");
        },

        prefill: {
          name: user.name,
          email: user.email,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);
    }
  };


  if (loading) {
    return (
      <div className="pricing-page">
        <h2>Loading...</h2>
      </div>
    );
  }




  const isSubscriptionActive =
  paymentInfo?.isPaid &&
  paymentInfo?.isSubscriptionActive;

  return (
    <div className="pricing-page animate-fadeIn">
      {isSubscriptionActive ? (
        <div className="subscription-card">
          <h1>🎉 Premium Plan Active</h1>

          <div className="subscription-details">
            <div>
              <h4>Plan</h4>
              <p>Premium</p>
            </div>

            <div>
              <h4>Payment Date</h4>
              <p>
                {new Date(paymentInfo.payment.paid_at).toLocaleDateString(
                  "en-IN",
                )}
              </p>
            </div>

            <div>
              <h4>Expiry Date</h4>
              <p>
                {new Date(paymentInfo.payment.end_date).toLocaleDateString(
                  "en-IN",
                )}
              </p>
            </div>

            <div>
              <h4>Status</h4>
              <p>Active ✅</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="pricing-header">
            <h1>Choose Your Plan</h1>

            <p>Start collecting more Google reviews with powerful QR tools.</p>
          </div>

          <div className="pricing-grid">
            {/* FREE CARD */}
            <div className="pricing-card">
              <span className="plan-badge">Free Plan</span>

              <h2>₹0</h2>

              <p className="plan-duration">Zero Fees</p>

              <div className="plan-features">
                <p>✔ 15 reviews monthly</p>
                <p>✔ QR Code Generator</p>
                <p>✔ Review Dashboard</p>
                <p>✔ Basic Analytics</p>
                <p>❌ Customer Review Analytics</p>
              </div>
            </div>

            {/* PREMIUM CARD */}
            <div className="pricing-card">
              <span className="plan-badge">Premium Plan</span>

              <h2>₹999</h2>

              <p className="plan-duration">per month</p>

              <div className="plan-features">
                <p>✔ 100 Reviews</p>
                <p>✔ QR Code Generator</p>
                <p>✔ Review Dashboard</p>
                <p>✔ Basic Analytics</p>
                <p>✔ Customer Review Analytics</p>
              </div>

              <button className="buy-btn" onClick={handlePayment}>
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

 
 



}


export default PaymentPage