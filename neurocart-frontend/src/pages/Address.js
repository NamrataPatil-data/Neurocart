import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const continueToPayment = () => {
    if (!address.trim()) {
      alert("Please enter address");
      return;
    }

    localStorage.setItem("address", address);

    navigate("/payment");
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
        <h2>Delivery Address 📍</h2>

        <textarea
          rows="6"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full delivery address"
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            marginTop: "15px",
            backgroundColor: "#2a2a2a",
            color: "white"
          }}
        />

        <button
          onClick={continueToPayment}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            backgroundColor: "#2874f0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}

export default Address;