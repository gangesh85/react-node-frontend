import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/products", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error);
      setProducts([]);
    }
  };

  const handleDelete = async (id) => {
    let result = window.confirm("Are you sure want to delete item!");
    if (result) {
      try {
        let response = await fetch(`http://localhost:3001/product/${id}`, {
          method: "delete",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        response = await response.json();
        alert(`${response.deletedCount} item is deleted from product list:`);
      } catch (error) {
        alert("Failed to delete product.");
      }
      fetchData();
    }
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`http://localhost:3001/search/${key}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      }
    } else {
      fetchData();
    }
  };

  if (error) {
    return <h1>{error.message}</h1>;
  } else
    return (
      <>
        <h2>Products Page</h2>
        <input
          type="text"
          placeholder="Search Product"
          onChange={handleSearch}
        />
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
