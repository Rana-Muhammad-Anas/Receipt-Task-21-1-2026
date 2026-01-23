import { useState } from "react";
import OPD_Services from "./OPD Services/OPD_Services.jsx";
import { Routes,Route } from "react-router-dom";
import Receipt from "./Receipt/Receipt.jsx";
import Consultant_Timing from "./Consultant/Consultant_Timing.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<OPD_Services />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/consultant-timing" element={<Consultant_Timing />} />
      </Routes>
    </>
  );
}

export default App;
