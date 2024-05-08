import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./router/UserRoutes";
import AdminRoutes from "./router/AdminRoutes";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
