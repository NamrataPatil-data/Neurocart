import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ReviewOrder() {

  const navigate = useNavigate();

  const checkoutType =
    localStorage.getItem("checkoutType");

  const total =
    Number(localStorage.getItem("total")) || 0;

  const address =
    localStorage.getItem("address") || "";

  const paymentMethod =
    localStorage.getItem("paymentMethod") || "COD";

  const buyNowProduct =
    JSON.parse(
      localStorage.getItem("buyNowProduct")
    );

  const placeOrder = async () => {

    const token =
      localStorage.getItem("token");

    const userId =
      localStorage.getItem("userId");

    if (!token || !userId) {

      alert(
        "Please login before placing an order"
      );

      navigate("/login");

      return;
    }

    try {

      const orderData = {
        productName:
          checkoutType === "buyNow"
            ? buyNowProduct?.name
            : "Cart Order",

        price: total,

        totalAmount: total,

        quantity: 1,

        address: address,

        paymentMethod: paymentMethod
      };

      console.log("Sending Order:", orderData);

      await API.post(
        `/api/orders?userId=${userId}`,
        orderData
      );

      alert(
        "Order placed successfully ✅"
      );

      navigate("/orders");

    } catch (err) {

      console.log(err);

      alert("Order failed ❌");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        textAlign: "center"
      }}
    >
      <h2>Review Order 🧾</h2>

      {checkoutType === "buyNow" &&
        buyNowProduct && (
          <div
            style={{
              marginBottom: "20px"
            }}
          >
            <h3>
              {buyNowProduct.name}
            </h3>

            <p>
              ₹
              {buyNowProduct.price}
            </p>
          </div>
        )}

      <p>
        <strong>Address:</strong>{" "}
        {address}
      </p>

      <p>
        <strong>
          Payment Method:
        </strong>{" "}
        {paymentMethod}
      </p>

      <p>
        <strong>Total:</strong> ₹
        {total}
      </p>

      <button
        onClick={placeOrder}
        style={{
          padding: "12px 24px",
          backgroundColor: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default ReviewOrder;