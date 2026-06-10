import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const continueToReview = () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    localStorage.setItem(
      "paymentMethod",
      method
    );

    navigate("/review");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "#1f1f1f",
          padding: "30px",
          borderRadius: "12px"
        }}
      >
        <h2>Select Payment Method 💳</h2>

        <div style={{ marginTop: "20px" }}>
          <label>
            <input
              type="radio"
              value="Cash on Delivery"
              checked={
                method === "Cash on Delivery"
              }
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />
            Cash on Delivery
          </label>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            <input
              type="radio"
              value="UPI"
              checked={method === "UPI"}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />
            UPI Payment
          </label>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            <input
              type="radio"
              value="Card"
              checked={method === "Card"}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />
            Debit / Credit Card
          </label>
        </div>

        <button
          onClick={continueToReview}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "25px",
            backgroundColor: "#2874f0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Continue to Review →
        </button>
      </div>
    </div>
  );
}

export default Payment;