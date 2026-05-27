import React from 'react'
import './PaymentPage.css';
import api from "../api";

const PaymentPage = ({user}) => {



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


  return (
    <div>
      <div className="pricing-page animate-fadeIn">
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>

          <p>Start collecting more Google reviews with powerful QR tools.</p>
        </div>

        <div className="pricing-grid">
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
              {/* <p>❌ Review Dashboard</p> */}
            </div>

            {/* <button className="buy-btn" onClick={handlePayment}>
              Buy Now
            </button> */}
          </div>

          {/* STARTER */}
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

          {/* PRO */}
          {/* <div className="pricing-card active-plan">
            <span className="popular-tag">Most Popular</span>

            <span className="plan-badge">Pro</span>

            <h2>₹999</h2>

            <p className="plan-duration">per month</p>

            <div className="plan-features">
              <p>✔ Unlimited Businesses</p>
              <p>✔ Unlimited QR Codes</p>
              <p>✔ AI Review Replies</p>
              <p>✔ Smart Analytics</p>
              <p>✔ Priority Support</p>
            </div>

            <button className="buy-btn">Buy Now</button>
          </div> */}

          {/* ENTERPRISE */}
          {/* <div className="pricing-card">
            <span className="plan-badge">Enterprise</span>

            <h2>₹2999</h2>

            <p className="plan-duration">per month</p>

            <div className="plan-features">
              <p>✔ Everything in Pro</p>
              <p>✔ Team Access</p>
              <p>✔ Custom Branding</p>
              <p>✔ API Access</p>
              <p>✔ Dedicated Support</p>
            </div>

            <button className="buy-btn">Contact Sales</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage