import { Link, Route, Routes, useNavigate } from "react-router";
import Signup from "./Signup";
import PrivateRoute from "./PrivateRoute";
import { Login } from "./Login";
import Users from "./Users";
import Profile from "./Profile";
import AddProduct from "./AddProduct";
import Products from "./Products";
import UpdateProduct from "./Update";
// import logo from "../../public/logo.jpg";

export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <nav className="nav">
        {auth && (
          <>
            <Link to="/">Products</Link>
            <Link to="/add">Add Product</Link>
            {/* <Link to="/update/:id">Update Product</Link> */}
            <Link to="/profile">Profile</Link>
            <Link to="/users">Users</Link>
            <Link onClick={logout} to="/logout">
              Logout
            </Link>
          </>
        )}
      </nav>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
