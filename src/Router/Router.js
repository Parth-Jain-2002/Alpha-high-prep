import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Components/Home/index";
import Search from "../Components/Search/index";

const Rautes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </>
  );
};

export default Rautes;
