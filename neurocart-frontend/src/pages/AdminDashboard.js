import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    imageUrl: "",
    brand: "",
    stock: "",
    specifications: ""
  });

  const [editingId, setEditingId] =
      useState(null);

      useEffect(() => {
        loadProducts();
      }, []);

  const loadProducts = async () => {

    try {

      const res =
        await API.get("/api/products");

      setProducts(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]:
        e.target.value
    });
  };

  const saveProduct = async () => {

    try {

      if (editingId) {

        await API.put(
          `/api/products/${editingId}`,
          product
        );

        alert("Product Updated ✅");

      } else {

        await API.post(
          "/api/products",
          product
        );

        alert("Product Added ✅");
      }

      setProduct({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        imageUrl: "",
        brand: "",
        stock: "",
        specifications: ""
      });

      setEditingId(null);

      loadProducts();

    } catch (err) {

      console.log(err);

      alert("Failed ❌");
    }
  };

  const editProduct = (p) => {

    setEditingId(p.id);

    setProduct({
      name: p.name,
      description: p.description,
      price: p.price,
      discountPrice: p.discountPrice,
      category: p.category,
      imageUrl: p.imageUrl,
      brand: p.brand,
      stock: p.stock,
      specifications: p.specifications
    });
    };

  const deleteProduct = async (id) => {

    if (
      !window.confirm(
        "Delete Product?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/api/products/${id}`
      );

      alert("Deleted ✅");

      loadProducts();

    } catch (err) {

      console.log(err);

      alert("Failed ❌");
    }
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
      <h1
        style={{
          textAlign: "center"
        }}
      >
        Admin Dashboard 👨‍💼
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          backgroundColor: "#1f1f1f",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        <h2>
          {editingId
            ? "Update Product"
            : "Add Product"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Original Price"
          value={product.discountPrice}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="specifications"
          placeholder="Specifications"
          value={product.specifications}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px"
          }}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "120px"
          }}
        />

        <button
          onClick={saveProduct}
          style={saveBtn}
        >
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>

      <h2
        style={{
          textAlign: "center"
        }}
      >
        Products
      </h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            backgroundColor: "#1f1f1f",
            margin: "15px auto",
            maxWidth: "900px",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>{p.name}</h3>

          <div>
            <span
              style={{
                color: "#22c55e",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              ₹{p.price}
            </span>

            {p.discountPrice && (
              <span
                style={{
                  marginLeft: "10px",
                  textDecoration: "line-through",
                  color: "#94a3b8"
                }}
              >
                ₹{p.discountPrice}
              </span>
            )}
          </div>

          <p>{p.category}</p>

          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
          >
            <button
              onClick={() =>
                editProduct(p)
              }
              style={editBtn}
            >
              Edit ✏️
            </button>

            <button
              onClick={() =>
                deleteProduct(p.id)
              }
              style={deleteBtn}
            >
              Delete ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none"
};

const saveBtn = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  backgroundColor: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const editBtn = {
  padding: "10px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminDashboard;