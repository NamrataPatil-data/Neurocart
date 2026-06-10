import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [location.search]);

  const loadProducts = async () => {

    try {

      const res = await API.get("/api/products");

      const params =
        new URLSearchParams(location.search);

      const category =
        params.get("category");

      let filteredProducts =
        res.data;

      if (category) {

        filteredProducts =
          res.data.filter(
            (product) =>
              product.category &&
              product.category.toLowerCase() ===
              category.toLowerCase()
          );
      }

      setProducts(filteredProducts);

    } catch (err) {

      console.log(err);
    }
  };

  const addToCart = async (productId) => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    try {

      const userId =
        localStorage.getItem("userId");

      await API.post(
        `/api/cart?userId=${userId}&productId=${productId}&quantity=1`
      );

      alert("Added to Cart 🛒");

    } catch (err) {

      console.log(err);

      alert("Failed to add product");
    }
  };

  const buyNow = (product) => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    localStorage.setItem(
      "checkoutType",
      "buyNow"
    );

    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify(product)
    );

    localStorage.setItem(
      "total",
      product.price
    );

    navigate("/address");
  };

  const addToWishlist = (product) => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    const userId =
      localStorage.getItem("userId");

    const wishlistKey =
      `wishlist_${userId}`;

    const existing =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];

    const alreadyExists =
      existing.find(
        (item) => item.id === product.id
      );

    if (!alreadyExists) {

      existing.push(product);

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(existing)
      );

      alert("Added to Wishlist ❤️");

    } else {

      alert("Already in Wishlist");
    }
  };

  const displayedProducts =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "42px"
        }}
      >
        Products
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px"
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "450px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            fontSize: "16px"
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px"
        }}
      >
        {displayedProducts.map(
          (product) => (
            <div
              key={product.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "relative"
                }}
              >
                <>
                  {product.discountPrice && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        zIndex: 10
                      }}
                    >
                      SALE 🔥
                    </div>
                  )}

                  <img
                    src={
                      product.imageUrl ||
                      product.image_url
                    }
                    alt={product.name}
                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      cursor: "pointer",
                      borderBottom:
                        "1px solid #334155"
                    }}
                  />
                </>

                <button
                  onClick={() =>
                    addToWishlist(product)
                  }
                  style={wishlistBtn}
                >
                  ♡
                </button>
              </div>

              <div
                style={{
                  padding: "20px"
                }}
              >
               <h2
                 onClick={() =>
                   navigate(
                     `/product/${product.id}`
                   )
                 }
                 style={{
                   cursor: "pointer",
                   minHeight: "60px",
                   marginBottom: "10px"
                 }}
               >
                 {product.name}
               </h2>

               <div
                 style={{
                   color: "#facc15",
                   fontSize: "18px",
                   marginBottom: "10px",
                   fontWeight: "bold"
                 }}
               >
                 ⭐⭐⭐⭐⭐ {product.rating || 0}
               </div>

               {product.brand && (
                 <p
                   style={{
                     color: "#38bdf8",
                     fontWeight: "bold",
                     marginBottom: "10px"
                   }}
                 >
                   {product.brand}
                 </p>
               )}

               <div
                 style={{
                   marginBottom: "12px"
                 }}
               >
                 <span
                   style={{
                     color: "#22c55e",
                     fontSize: "24px",
                     fontWeight: "bold"
                   }}
                 >
                   ₹{product.price}
                 </span>

                 {product.discountPrice && (
                   <span
                     style={{
                       marginLeft: "10px",
                       textDecoration:
                         "line-through",
                       color: "#94a3b8"
                     }}
                   >
                     ₹{product.discountPrice}
                   </span>
                 )}
               </div>

                <p>
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <button
                    onClick={() =>
                      addToCart(product.id)
                    }
                    style={cartBtn}
                  >
                    Add to Cart 🛒
                  </button>

                  <button
                    onClick={() =>
                      buyNow(product)
                    }
                    style={buyBtn}
                  >
                    Buy Now ⚡
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.35)",
  transition: "all 0.3s ease",
  minHeight: "550px"
};

const wishlistBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "white",
  color: "#ff3f6c",
  fontSize: "22px",
  cursor: "pointer"
};

const cartBtn = {
  flex: 1,
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};

const buyBtn = {
  flex: 1,
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};

export default Products;