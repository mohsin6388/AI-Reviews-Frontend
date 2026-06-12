import React , {useState, useEffect} from 'react'
import './PaymentPage.css';
import api from "../api";
import { API } from "../utils/api"

const PaymentPage = ({user}) => {

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setLoading(true)
      try {

        const { data } = await api.get(
          `/payment/check-payment/${user.id}`);


          
             setPaymentInfo(data);
             setLoading(false)
             console.log("dekho data aa gya hai ==> ", paymentInfo?.data?.plan_name);
               

       
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

  const handlePayment = async (id) => {
  
    try {

      const token = localStorage.getItem("rb_token");

      const { data } = await api.post(
        "/payment/create-order",
        {
          user_id: user.id,
          // amount: 999,
          plan_name: id,
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

        name: "Review Ninja Pro",

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
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid #e4e8f0",
              borderTopColor: "#3d5af1",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "#6b7280", fontSize: 14 }}>
            Loading Terms &amp; Conditions…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }




  // const isSubscriptionActive =
  // paymentInfo?.isPaid &&
  // paymentInfo?.isSubscriptionActive;

  return (
    <div className="pricing-page animate-fadeIn">
      <>
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>

          <p>Start collecting more Google reviews with powerful QR tools.</p>
        </div>

        <div className="pricing-grid">
          {/* Starter CARD */}
          <div className="pricing-card">
            <span className="plan-badge">Starter Plan</span>

            <p
              style={{
                color: "#7a818d",
                fontSize: "12px",
                paddingBottom: "5px",
              }}
            >
              Setup: ₹999 one-time
            </p>

            <h2>
              ₹799
              <span style={{ color: "#6b7280", fontSize: "15px" }}>/month</span>
            </h2>

            {/* <p className="plan-duration">per month</p> */}

            <div className="plan-features" style={{ paddingTop: "20px" }}>
              <p>✔ 1 Acrylic QR Standee</p>
              <p>✔ Basic AI Engine</p>
              <p>✔ 50 Reviews/month</p>
              <p>✔ Negative Feedback Filter</p>
              <p>✔ Email Support</p>
            </div>

            <button
              onClick={() => handlePayment("starter")}
              className={`buy-btn ${paymentInfo?.data?.plan_name === "starter" ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={paymentInfo?.data?.plan_name === "starter"}
            >
              {paymentInfo?.data?.plan_name === "starter"
                ? "Current Plan"
                : "Buy Now"}
            </button>

            {/* <button
              onClick={() => handlePayment("starter")}
              className={`buy-btn ${
                paymentInfo?.data?.plan_name === "starter"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                paymentInfo?.data?.plan_name ===
                "starter"
              }
            >
              Buy Now
            </button> */}
          </div>

          {/* PREMIUM CARD */}
          <div className="pricing-card">
            <span className="plan-badge">Premium Plan</span>

            <p
              style={{
                color: "#7a818d",
                fontSize: "12px",
                paddingBottom: "5px",
              }}
            >
              Setup: ₹1,499 one-time
            </p>

            <h2>
              ₹999
              <span style={{ color: "#6b7280", fontSize: "15px" }}>/month</span>
            </h2>
            {/* <p className="plan-duration">per month</p> */}

            <div className="plan-features" style={{ paddingTop: "20px" }}>
              <p>✔ 2 Premium Acrylic Standees</p>
              <p>✔ Unlimited AI Reviews</p>
              <p>✔ Negative Review Filter</p>
              <p>✔ Keyword-Rich AI Reviews</p>
              <p>✔ Priority Support</p>
            </div>

            <button
              onClick={() => handlePayment("premium")}
              className={`buy-btn ${paymentInfo?.data?.plan_name === "premium" ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={paymentInfo?.data?.plan_name === "premium"} // ✅ optional chaining lagao
            >
              {paymentInfo?.data?.plan_name === "premium"
                ? "Current Plan"
                : "Buy Now"}
            </button>

            {/* <button
              className="buy-btn"
              onClick={() => handlePayment("premium")}
              disabled={paymentInfo?.data.plan_name === "premium"}
            >
              Buy Now
            </button> */}
          </div>

          <div className="pricing-card">
            <span className="plan-badge">Enterprise Plan</span>

            <p
              style={{
                color: "#7a818d",
                fontSize: "12px",
                paddingBottom: "5px",
              }}
            >
              Min. ₹1,999/month
            </p>

            <h2>Custom</h2>

            {/* <p className="plan-duration">per month</p> */}

            <div className="plan-features" style={{ paddingTop: "20px" }}>
              <p>✔ Custom Branded Standees</p>
              <p>✔ Centralized Dashboard</p>
              <p>✔ Unlimited Reviews & Locations</p>
              <p>✔ API Access & Integrations</p>
              <p>✔ Customer Review Analytics</p>
            </div>

            <button className="buy-btn">
              <a
                href="https://wa.me/918750200899"
                style={{ textDecoration: "none", color: "white" }}
              >
                Contact Now
              </a>
            </button>
          </div>
        </div>
      </>
    </div>
  );

 
 



}


export default PaymentPage