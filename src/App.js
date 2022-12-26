import { Box } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import StockPage from "./Pages/StockPage";
import Header from "./components/Header";
import WatchList from "./Pages/WatchList";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Redirect from "./components/Redirect";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Redirect />;
    }
    return children;
  };

  const LogoutRoute = ({ children }) => {
    if (!currentUser) {
      return children;
    }
    return <Navigate to="/"/>;
  };

  return (
    <BrowserRouter>
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:id" element={<StockPage />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LogoutRoute>
                <Login />
              </LogoutRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
