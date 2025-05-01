import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../App";
import React from "react";
import NotFoundPage from "../pages/404";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/NotFound" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
