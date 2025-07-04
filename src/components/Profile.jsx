export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
  return (
    <>
      <h3> Welcome, {user.name}</h3>
    </>
  );
}
