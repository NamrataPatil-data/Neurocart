import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCart = () => {
    const userId = localStorage.getItem("userId");

    API.get(`/api/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/api/cart/${id}`);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put(`/api/cart/${id}?quantity=${quantity}`);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const deliveryFee =
    subtotal === 0
      ? 0
      : subtotal > 1000
        ? 0
        : 40;
  const discount =
    subtotal === 0
      ? 0
      : subtotal > 5000
        ? 300
        : 0;
  const total = subtotal + deliveryFee - discount;

  const proceedToCheckout = () => {
    localStorage.setItem("checkoutType", "cart");
    localStorage.setItem("total", total);

    navigate("/address");
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        padding: "30px"
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Shopping Cart 🛒
      </h2>

      {cart.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Cart is empty 😢
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <div style={{ flex: 2, minWidth: "500px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#1f1f1f",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px"
              }}
            >
              <h3>{item.product?.name}</h3>

              <p>Price: ₹{item.product?.price}</p>

              <p>
                Total: ₹
                {(item.product?.price || 0) * item.quantity}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                  style={qtyBtn}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                  style={qtyBtn}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={removeBtn}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            backgroundColor: "#1f1f1f",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h3>Price Details</h3>

          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery Fee: ₹{deliveryFee}</p>
          <p>Discount: -₹{discount}</p>

          <hr />

          <h2>Total: ₹{total}</h2>

          <button
            disabled={cart.length === 0}
            onClick={proceedToCheckout}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor:
                cart.length === 0
                  ? "#555"
                  : "#fb641b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                cart.length === 0
                  ? "not-allowed"
                  : "pointer",
              marginTop: "20px"
            }}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  padding: "8px 12px",
  backgroundColor: "#2874f0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const removeBtn = {
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Cart;