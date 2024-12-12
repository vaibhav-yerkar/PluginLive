import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import ResultPage from "./pages/ResultPage";
import { isAuthenticated } from "./utils/auth";

import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5001";
axios.defaults.params = {};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/mock-interview"
          element={
            isAuthenticated() ? <MockInterviewPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/result/:id"
          element={
            isAuthenticated() ? <ResultPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
