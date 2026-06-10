import { useEffect, useState } from "react";
import API from "../services/api";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const userId =
      localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    const items =
      JSON.parse(
        localStorage.getItem(
          `wishlist_${userId}`
        )
      ) || [];

    setWishlist(items);

  }, []);

  const removeFromWishlist = (id) => {

    const updated =
      wishlist.filter(
        (item) => item.id !== id
      );

    setWishlist(updated);

    const userId =
      localStorage.getItem("userId");

    localStorage.setItem(
      `wishlist_${userId}`,
      JSON.stringify(updated)
    );
  };

  const moveToCart = async (productId) => {

    try {

      const userId =
        localStorage.getItem("userId");

      await API.post(
        `/api/cart?userId=${userId}&productId=${productId}&quantity=1`
      );

      removeFromWishlist(productId);

      alert("Moved to Cart 🛒");

    } catch (err) {

      console.log(err);

      alert("Failed ❌");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Wishlist ❤️
      </h2>

      {wishlist.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Wishlist is empty 😢
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#1f1f1f",
              width: "250px",
              margin: "10px",
              padding: "15px",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button
              onClick={() =>
                moveToCart(item.id)
              }
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#2874f0",
                color: "white",
                border: "none",
                borderRadius: "6px",
                marginBottom: "10px",
                cursor: "pointer"
              }}
            >
              Move to Cart 🛒
            </button>

            <button
              onClick={() =>
                removeFromWishlist(item.id)
              }
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;