import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import { ThemeContext, ThemeContextProvider } from "./context/theme/ThemeContext";
import Topbar from "./components/topbar/Topbar";

function App() {

  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [isThemeDark, setIsThemeDark] = useState(isDark);

  return (
    <ThemeContextProvider>
      <div className="mydiv" my-data-theme={isThemeDark && "dark"}>
        <Router>
          {user ? <Topbar setIsThemeDark={setIsThemeDark} /> : true}
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />
            <Route path="/profile/:username" element={user ? <Profile /> : <Navigate replace to="/" />} />
          </Routes>
        </Router>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
