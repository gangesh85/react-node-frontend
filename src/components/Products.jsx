import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    setProducts(data);
  };
  const handleDelete = async (id) => {
    let result = window.confirm("Are you sure want to delete item!");
    if (result) {
      let response = await fetch(`http://localhost:3001/product/${id}`, {
        method: "delete",
      });
      response = await response.json();
      console.log(response.deletedCount);
      alert(`${response.deletedCount} item is deleted from product list:`);
    }

    fetchData();
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      const response = await fetch(`http://localhost:3001/search/${key}`);
      const data = await response.json();
      setProducts(data);
    } else {
      fetchData();
    }
  };

  return (
    <>
      <h2>Products Page</h2>
      <input type="text" placeholder="Search Product" onChange={handleSearch} />
      <ul>
        <li>S.N.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name ? product.name : "NA"}</li>
            <li>{product.price ? product.price : "NA"}</li>
            <li>{product.category ? product.category : "NA"}</li>
            <li>
              <h3
                style={{ display: "inline", cursor: "pointer" }}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </h3>
              <Link to={"/update/" + product._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h3>Not Found!</h3>
      )}
    </>
  );
}
