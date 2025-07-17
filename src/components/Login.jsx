import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    let response = await fetch("http://localhost:3001/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    
    let userData = await response.json();
    let user = JSON.stringify(userData.user);
    if (userData.auth) {
      localStorage.setItem("user", user);
      localStorage.setItem("token", userData.auth);
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h2>Login Page</h2>
      <input
        type="text"
        id="email"
        placeholder="Enter Email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="Enter Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>login</button>
      <p>
        Don't have account.<Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
