import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

 const statuses = [
   "Order Placed",
   "Packed",
   "Shipped",
   "Out for Delivery",
   "Delivered"
 ];

  useEffect(() => {
    const userId =
      localStorage.getItem("userId");

    API.get(
      `/api/orders/${userId}`
    )
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getOrderStatus = (id) => {
    return statuses[id % statuses.length];
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
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Your Orders 📦
      </h2>

      {orders.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No orders yet 😢
        </p>
      )}

      {orders.map((order, index) => {

        const currentStatus =
          order.status || "Order Placed";

        const currentIndex =
          statuses.indexOf(currentStatus);

        return (
          <div
            key={order.id}
            style={{
              backgroundColor: "#1f1f1f",
              padding: "25px",
              margin: "20px auto",
              maxWidth: "900px",
              borderRadius: "15px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.4)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
              <h3>
                Order #{index + 1}
              </h3>

              <span
                style={{
                  backgroundColor:
                    "#22c55e",
                  padding:
                    "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}
              >
                {currentStatus}
              </span>
            </div>

            <hr
              style={{
                borderColor: "#333"
              }}
            />

            <p>
              <strong>
                Product:
              </strong>{" "}
              {order.productName}
            </p>

            <p>
              <strong>
                Price:
              </strong>{" "}
              ₹{order.price}
            </p>

            <p>
              <strong>
                Quantity:
              </strong>{" "}
              {order.quantity}
            </p>

            <p>
              <strong>
                Total Amount:
              </strong>{" "}
              ₹
              {order.totalAmount ||
                order.price}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {order.address}
            </p>

            <p>
              <strong>
                Payment:
              </strong>{" "}
              {order.paymentMethod}
            </p>

            <div
              style={{
                marginTop: "25px"
              }}
            >
              <h4>
                Track Order 🚚
              </h4>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >
                {statuses.map(
                  (
                    status,
                    index
                  ) => (
                    <div
                      key={status}
                      style={{
                        flex: 1,
                        minWidth:
                          "120px",
                        textAlign:
                          "center",
                        padding:
                          "10px",
                        borderRadius:
                          "8px",
                        backgroundColor:
                          index <=
                          currentIndex
                            ? "#22c55e"
                            : "#333"
                      }}
                    >
                      {status}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;