import React from "react";
import { Routes, Route } from "react-router-dom";

import Search from "../Components/Search/index";

const Rautes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Search/>} />
      </Routes>
    </>
  );
};

export default Rautes;
