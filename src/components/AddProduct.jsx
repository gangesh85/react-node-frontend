import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.email);
  }, []);

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      setError(true);
      return;
    }

    await fetch("http://localhost:3001/addproduct", {
      method: "Post",
      body: JSON.stringify({ name, price, category, userId }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    alert("Item added successfully.");
    navigate("/");
  };

  const handleReset = () => {
    setName("");
    setPrice("");
    setCategory("");
    setError(false);
  };

  return (
    <>
      <h2>Add Product</h2>
      <input
        type="text"
        id="productName"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span>Enter name</span>}
      <input
        type="text"
        id="productCost"
        placeholder="Enter Product cost/kg"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span>Enter Price</span>}
      <input
        type="text"
        id="productCategory"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span>Enter category</span>}
      <button onClick={handleSubmit}>Add</button>
      {"\t"}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
