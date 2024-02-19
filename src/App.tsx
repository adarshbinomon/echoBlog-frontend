import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./router/UserRoutes";
import AdminRoutes from "./router/AdminRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
