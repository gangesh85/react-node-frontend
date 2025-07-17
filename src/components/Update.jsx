import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.email);
    getData();
  },[]);

  const getData = async () => {
    const response = await fetch(`http://localhost:3001/product/${params.id}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    const data = await response.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
  };

  const handleReset = () => {
    setName("");
    setPrice("");
    setCategory("");
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:3001/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    alert("Update Success.");
    navigate("/");
  };

  return (
    <>
      <h2>Update Product</h2>
      <input
        type="text"
        id="productName"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="productCost"
        placeholder="Enter Product cost/kg"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        id="productCategory"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      {"\t"}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
