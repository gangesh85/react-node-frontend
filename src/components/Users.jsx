import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch("http://localhost:3001/users", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <>
      {users.map((user) => {
        return <p key={user.email}>{user.name}</p>;
      })}
    </>
  );
}
