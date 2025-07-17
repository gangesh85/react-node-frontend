export default function Profile() {
  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData)
  return (
    <>
      <h3> Welcome, {userData.name} you have signed.</h3>
    </>
  );
}
