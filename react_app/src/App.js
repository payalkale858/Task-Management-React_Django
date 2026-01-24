import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Gettodo from "./Gettodo";
import Todo from "./Todo";
import './App.css';

function App() {
  // simulate login (later replace with JWT)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
     <div className="App">
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} ></Navbar>

      <Routes>
        <Route path="/" element={<Todo></Todo>} />
        <Route path="/todos" element={<Gettodo></Gettodo>}/>
           
        <Route path="/logout" element={<h1>Logout</h1>} />
      </Routes>
      

    </BrowserRouter>
    </div>
  );
}

export default App;
