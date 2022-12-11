import "./App.css";
import UserHome from "./pages/Home/UserHome";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import About from "./pages/About";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !userLoggedIn ? (
              <About setUserLoggedIn={setUserLoggedIn} />
            ) : (
              <Navigate replace to={"/home"} />
            )
          }
        />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
