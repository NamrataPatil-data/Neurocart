import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const userName =
    localStorage.getItem("name");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/");

    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#38bdf8",
          cursor: "pointer",
          letterSpacing: "1px"
        }}
      >
        NeuroCart 🛒
      </div>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px"
        }}
      >
        <Link to="/" style={navLink}>
          Home
        </Link>

        <Link to="/products" style={navLink}>
          Products
        </Link>

        {token ? (
          <>
            {role === "ADMIN" && (
              <Link to="/admin" style={navLink}>
                Admin 👨‍💼
              </Link>
            )}

            <Link to="/wishlist" style={navLink}>
              Wishlist ❤️
            </Link>

            <Link to="/cart" style={navLink}>
              Cart 🛒
            </Link>

            <Link to="/orders" style={navLink}>
              Orders 📦
            </Link>

            <span
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Welcome, {userName}
            </span>

            <button
              onClick={logout}
              style={logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLink}>
              Login
            </Link>

            <Link to="/register" style={navLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navLink = {
  color: "white",
  textDecoration: "none",
  fontSize: "17px",
  fontWeight: "500"
};

const logoutBtn = {
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

export default Navbar;