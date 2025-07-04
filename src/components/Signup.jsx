import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSignup = async () => {
    let response = await fetch("http://localhost:3001/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "content-type": "application/json" },
    });
    let userData = await response.json();
    const user = JSON.stringify(userData);
    localStorage.setItem("user", user);
    navigate("/");
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          id="passowrd"
          placeholder="Enter Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        <p>
          already have an account. <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
