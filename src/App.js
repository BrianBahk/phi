import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/navbar.jsx";
import MainCard from "./components/NavBar/maincard.js";
import ExamplePage from "./examplePage/examplesPage.js";
import AboutPage from "./examplePage/aboutPage.js";
import Login from "./examplePage/login.js";
import Plaid from "./pages/plaid.jsx";
import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/ExamplePage" element={<ExamplePage />}>
          {" "}
        </Route>
        <Route path="/AboutUs" element={<AboutPage />}>
          {" "}
        </Route>
        <Route path="/Login" element={<Login />}></Route>
        {/* Render the Plaid component within the Login route */}
        <Route path="/plaid" element={<Plaid />} />
        <Route path="/" element={<MainCard />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
