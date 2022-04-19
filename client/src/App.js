import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        {user && <Route path="/" exact element={<HomePage />} />}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
