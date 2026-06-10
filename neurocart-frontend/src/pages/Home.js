import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setFeaturedProducts(res.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const categoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const flashDealClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #020617, #0f172a)",
        minHeight: "100vh",
        color: "white"
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
          padding: "100px 20px",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "20px",
            fontWeight: "bold"
          }}
        >
          MEGA SALE UP TO 70% OFF
        </h1>

        <p
          style={{
            fontSize: "28px",
            marginBottom: "40px"
          }}
        >
          Premium shopping experience with AI-powered recommendations
        </p>

        <div>
          <button
            onClick={() => navigate("/products")}
            style={heroBtn}
          >
            Shop Now
          </button>

          <button
            onClick={() => navigate("/products")}
            style={{
              ...heroBtn,
              backgroundColor: "white",
              color: "black",
              marginLeft: "20px"
            }}
          >
            Explore Products
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "70px 40px" }}>
        <h2 style={sectionTitle}>Categories</h2>

        <div style={grid}>
          <div style={card} onClick={() => categoryClick("Mobiles")}>
            📱 Mobiles
          </div>

          <div style={card} onClick={() => categoryClick("Electronics")}>
            💻 Electronics
          </div>

          <div style={card} onClick={() => categoryClick("Fashion")}>
            👗 Fashion
          </div>

          <div style={card} onClick={() => categoryClick("Beauty")}>
            💄 Beauty
          </div>

          <div style={card} onClick={() => categoryClick("Books")}>
            📚 Books
          </div>

          <div style={card} onClick={() => categoryClick("Appliances")}>
            🏠 Appliances
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "30px 40px" }}>
        <h2 style={sectionTitle}>Featured Products</h2>

        <div style={grid}>
          {featuredProducts.map((product) => (
            <div key={product.id} style={productCard}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />

              <h3>{product.name}</h3>
              <p style={{ color: "#22c55e", fontSize: "28px" }}>
                ₹{product.price}
              </p>

              <button
                onClick={() => navigate(`/product/${product.id}`)}
                style={buyBtn}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FLASH DEALS */}
      <section style={{ padding: "70px 40px" }}>
        <h2 style={sectionTitle}>Flash Deals ⚡</h2>

        <div style={grid}>
          <div
            style={dealCard}
            onClick={() => flashDealClick("Electronics")}
          >
            🔥 50% OFF Electronics
          </div>

          <div
            style={dealCard}
            onClick={() => flashDealClick("Fashion")}
          >
            👗 Fashion Sale
          </div>

          <div
            style={dealCard}
            onClick={() => flashDealClick("Books")}
          >
            📚 Book Festival
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "50px 40px" }}>
        <h2 style={sectionTitle}>Why NeuroCart?</h2>

        <div style={grid}>
          <div
            style={featureCard}
            onClick={() => alert("Fast delivery within 24 hours 🚚")}
          >
            ⚡ Fast Delivery
          </div>

          <div
            style={featureCard}
            onClick={() => alert("Secure payments with encryption 🔒")}
          >
            🔐 Secure Payments
          </div>

          <div
            style={featureCard}
            onClick={() => navigate("/products")}
          >
            🤖 AI Recommendations
          </div>

          <div
            style={featureCard}
            onClick={() => alert("7 day easy returns available ↩")}
          >
            ↩ Easy Returns
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "70px 40px" }}>
        <h2 style={sectionTitle}>Customer Reviews</h2>

        <div style={grid}>
          <div style={reviewCard}>
            ⭐⭐⭐⭐⭐
            <p>Best shopping experience ever!</p>
          </div>

          <div style={reviewCard}>
            ⭐⭐⭐⭐⭐
            <p>Fast delivery and premium products.</p>
          </div>

          <div style={reviewCard}>
            ⭐⭐⭐⭐⭐
            <p>Beautiful interface and smooth checkout.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const sectionTitle = {
  textAlign: "center",
  fontSize: "48px",
  marginBottom: "40px"
};

const heroBtn = {
  padding: "18px 36px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#22c55e",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
  fontWeight: "bold"
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "25px",
  justifyContent: "center"
};

const card = {
  backgroundColor: "#1e293b",
  padding: "50px",
  borderRadius: "18px",
  cursor: "pointer",
  fontSize: "28px",
  minWidth: "220px",
  textAlign: "center"
};

const productCard = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "18px",
  width: "280px",
  textAlign: "center"
};

const buyBtn = {
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const dealCard = {
  backgroundColor: "#dc2626",
  padding: "35px",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "26px",
  minWidth: "300px",
  textAlign: "center"
};

const featureCard = {
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  cursor: "pointer",
  minWidth: "260px",
  textAlign: "center",
  fontSize: "24px"
};

const reviewCard = {
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  width: "320px",
  textAlign: "center",
  fontSize: "22px"
};

export default Home;