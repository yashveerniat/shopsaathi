import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;