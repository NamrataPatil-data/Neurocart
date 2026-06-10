import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    const res =
      await API.get("/api/orders");

    setOrders(res.data);
  };

  const updateStatus = async (
    orderId,
    status
  ) => {

    await API.put(
      `/api/orders/${orderId}/status?status=${status}`
    );

    loadOrders();
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        background: "#121212",
        minHeight: "100vh"
      }}
    >
      <h1>
        Manage Orders 📦
      </h1>

      {orders.map((order) => (

        <div
          key={order.id}
          style={{
            background: "#1f1f1f",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>
            {order.productName}
          </h3>

          <p>
            Current Status:
            {" "}
            {order.status}
          </p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(
                order.id,
                e.target.value
              )
            }
          >
            <option>
              Order Placed
            </option>

            <option>
              Packed
            </option>

            <option>
              Shipped
            </option>

            <option>
              Out for Delivery
            </option>

            <option>
              Delivered
            </option>
          </select>

        </div>
      ))}
    </div>
  );
}

export default AdminOrders;