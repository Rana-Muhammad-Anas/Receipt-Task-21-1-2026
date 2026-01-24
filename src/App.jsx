import OPD_Services from "./OPD Services/OPD_Services.jsx";
import { Routes,Route } from "react-router-dom";
import Receipt from "./Receipt/Receipt.jsx";
import Consultant_Timing from "./Consultant/Consultant_Timing.jsx";
import Consultant_Appointment from "./Consultant/Consultant_Appointment.jsx";
import DoctorRegister from "./Doctor/DoctorRegister.jsx";
import LinkTest from "./LinkTest.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LinkTest />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/opd-services" element={<OPD_Services />} />
        <Route path="/consultant-timing" element={<Consultant_Timing />} />
        <Route path="/consultant-appointment" element={<Consultant_Appointment />} />
        <Route path="/doctor-registration" element={<DoctorRegister />} />
        </Routes>
    </>
  );
}

export default App;
