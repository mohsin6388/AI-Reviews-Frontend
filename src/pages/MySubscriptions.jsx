import React, {useEffect, useState} from 'react'
import api from "../api";
import "../components/PaymentPage.css";

const MySubscriptions = ({user}) => {

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  

   useEffect(() => {
      const fetchPaymentStatus = async () => {
        setLoading(true)
        try {
  
          const { data } = await api.get(
            `/payment/check-payment/${user.id}`);
  
          console.log(data);
  
          setPaymentInfo(data);
          setLoading(false)
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
              Loading Your Subscription &amp; Details
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      );
    }



  return (
    <div>
      <div className="subscription-card">
        <h1>
          🎉 {paymentInfo.data.plan_name?.charAt(0).toUpperCase() + paymentInfo.data.plan_name?.slice(1)} Plan Active
        </h1>

        <div className="subscription-details">
          <div>
            <h4>Plan</h4>
            <p>{paymentInfo.data.plan_name?.charAt(0).toUpperCase() + paymentInfo.data.plan_name?.slice(1)}</p>
          </div>

          <div>
            <h4>Payment Date</h4>
            <p>
              {new Date(paymentInfo.data.start_date).toLocaleDateString(
                "en-IN",
              )}
            </p>
          </div>

          <div>
            <h4>Expiry Date</h4>
            <p>
              {new Date(paymentInfo.data.end_date).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div>
            <h4>Status</h4>
            <p>Active ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySubscriptions