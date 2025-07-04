import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <img src="./logo.jpg" alt="logo" />
      <h1 style={{ display: "inline" }}>Photorefit</h1>
      <Nav />
      <Footer />
    </div>
  );
}

export default App;
