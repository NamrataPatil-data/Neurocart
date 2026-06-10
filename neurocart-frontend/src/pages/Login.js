import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                loginData
            );

            console.log(response.data);

            localStorage.setItem(
              "token",
              response.data.token
            );

            localStorage.setItem(
              "userId",
              response.data.userId
            );

            localStorage.setItem(
              "email",
              response.data.email
            );

            localStorage.setItem(
              "name",
              response.data.name
            );
            localStorage.setItem(
              "role",
              response.data.role
            );

            alert("Login Successful ✅");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials ❌");
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0b1020",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <form
                onSubmit={loginUser}
                style={{
                    background: "#1e293b",
                    padding: "40px",
                    borderRadius: "15px",
                    width: "350px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >

                <h1
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                >
                    Login
                </button>

                <p
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    New user?

                    <Link
                        to="/register"
                        style={{
                            color: "#38bdf8",
                            marginLeft: "5px"
                        }}
                    >
                        Create Account
                    </Link>

                </p>

            </form>

        </div>
    );
}

const inputStyle = {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px"
};

const buttonStyle = {
    padding: "14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer"
};

export default Login;