import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await API.get("/api/products");
      const found = res.data.find(
        (p) => p.id === parseInt(id)
      );
      setProduct(found);
    } catch (err) {
      console.log(err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/${id}`);

      console.log("Reviews:", res.data);

      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    try {
      await API.post(`/api/cart?productId=${id}&quantity=1`);
      alert("Added to cart 🛒");
    } catch {
      navigate("/login");
    }
  };

  const buyNow = () => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify(product)
    );
    navigate("/address");
  };

  const toggleWishlist = () => {
    const existing =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existing.find(
      (item) => item.id === product.id
    );

    if (!alreadyExists) {
      existing.push(product);
      localStorage.setItem(
        "wishlist",
        JSON.stringify(existing)
      );
      alert("Added to wishlist ❤️");
    }
  };

  const submitReview = async () => {
    try {
      await API.post(`/api/reviews/${id}`, {
        username,
        rating,
        comment
      });

      setUsername("");
      setComment("");
      setRating(5);

      loadReviews();

      alert("Review added ⭐");
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap"
        }}
      >
        {/* IMAGE */}
        <div style={{ flex: 1 }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "550px",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
            }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>

          <p
            style={{
              fontSize: "32px",
              color: "#22c55e"
            }}
          >
            ₹{product.price}
          </p>

          <p>Category: {product.category}</p>

          <p>{product.description}</p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px"
            }}
          >
            <button onClick={addToCart} style={cartBtn}>
              Add to Cart 🛒
            </button>

            <button onClick={buyNow} style={buyBtn}>
              Buy Now ⚡
            </button>

            <button
              onClick={toggleWishlist}
              style={wishBtn}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ marginTop: "60px" }}>
        <h2>Customer Reviews ⭐</h2>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "30px"
          }}
        >
          <input
            placeholder="Your name"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={input}
          />

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            style={input}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            placeholder="Write review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            style={{
              ...input,
              height: "100px"
            }}
          />

          <button
            onClick={submitReview}
            style={buyBtn}
          >
            Submit Review
          </button>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "20px"
            }}
          >
            <h3>{review.username}</h3>
            <p>{"⭐".repeat(review.rating)}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none"
};

const cartBtn = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const buyBtn = {
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const wishBtn = {
  backgroundColor: "#ec4899",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "20px"
};

export default ProductDetails;