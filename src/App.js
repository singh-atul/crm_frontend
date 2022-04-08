import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0} from '@auth0/auth0-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import Login from "./pages/Login";
// import Customer from "./pages/Customer";
// import Engineer from "./pages/Engineer";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
            exact
            path="/"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Login />
              </Suspense>
            }
        />
        <Route
            exact
            path="/admin"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Admin />
              </Suspense>
            }
        />
        {/* <Route
            exact
            path="/customer"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Customer />
              </Suspense>
            }
        />
        <Route
            exact
            path="/engineer"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Engineer />
              </Suspense>
            }
        /> */}

      </Routes>
    </Router>
  );
}

export default App;
