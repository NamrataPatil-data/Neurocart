import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/auth/register",
                user
            );

            alert("Registration Successful ✅");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed ❌");
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
                onSubmit={registerUser}
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
                    Create Account
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                >
                    Register
                </button>

                <p
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    Already have account?

                    <Link
                        to="/login"
                        style={{
                            color: "#38bdf8",
                            marginLeft: "5px"
                        }}
                    >
                        Login
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

export default Register;