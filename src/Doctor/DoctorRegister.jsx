import { useState } from "react";

// Custom hook for doctor form state management
const useDoctorForm = () => {
  const initialDoctorInfo = {
    doctorName: "",
    department: "",
    address: "WMC Teaching Hospital",
    residencePhone: "",
    mobile: "",
    surgeonType: "",
    isAnesthetist: false,
    opdServices: [],
    opdCharges: "",
    indoorServices: [],
    indoorCharges: "",
    indoorShareType: "percentage",
    indoorShareValue: "",
  };

  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [newOpdService, setNewOpdService] = useState("");
  const [newIndoorService, setNewIndoorService] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDoctorInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addService = (serviceType, service) => {
    if (service.trim()) {
      setDoctorInfo((prev) => ({
        ...prev,
        [serviceType]: [...prev[serviceType], service.trim()],
      }));
      return "";
    }
    return service;
  };

  const removeService = (serviceType, index) => {
    setDoctorInfo((prev) => ({
      ...prev,
      [serviceType]: prev[serviceType].filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setDoctorInfo(initialDoctorInfo);
    setNewOpdService("");
    setNewIndoorService("");
  };

  return {
    doctorInfo,
    newOpdService,
    newIndoorService,
    setNewOpdService,
    setNewIndoorService,
    handleInputChange,
    addService,
    removeService,
    resetForm,
    setDoctorInfo,
  };
};

// Input Field Component
const InputField = ({ label, name, value, onChange, required, placeholder, type = "text", className = "", ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, onChange, required, options, placeholder, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder || "Select..."}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Service Management Component
const ServiceManagement = ({
  title,
  services,
  newService,
  setNewService,
  charges,
  onChargesChange,
  onAddService,
  onRemoveService,
  chargesName,
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Select Service</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <div className="xs:col-span-2 lg:col-span-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Enter service"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
            placeholder="Editable"
            readOnly
          />
        </div>
        <div>
          <input
            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            name={chargesName}
            value={charges}
            onChange={onChargesChange}
            placeholder="Enter charges"
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={onAddService}
            className="w-full xs:w-auto px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Add Service
          </button>
        </div>
      </div>

      {services.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Added Services:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {services.map((service, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-800 truncate">{service}</span>
                <button
                  onClick={() => onRemoveService(index)}
                  className="ml-2 px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Doctors Table Component
const DoctorsTable = ({ doctors, onDelete }) => (
  <div className="border border-gray-300 rounded-xl p-4 sm:p-6 overflow-hidden">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Doctors</h2>
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Sr.#</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">CONSULTANT</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700 hidden sm:table-cell">DEPARTMENT</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700 hidden md:table-cell">PHONE</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">MOBILE</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2 px-4 border-b text-sm font-medium text-gray-800">{index + 1}</td>
              <td className="py-2 px-4 border-b text-sm font-medium text-gray-900 truncate max-w-[150px]">{doctor.consultant}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700 hidden sm:table-cell truncate max-w-[120px]">{doctor.department}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700 hidden md:table-cell">{doctor.phone || "-"}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-700">{doctor.mobile || "-"}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onDelete(doctor.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Action Buttons Component
const ActionButtons = ({ onReset, onSave, onPrint }) => (
  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
    <button
      onClick={onReset}
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
    >
      New
    </button>
    <button
      onClick={onSave}
      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
    >
      Save Doctor
    </button>
    <button
      onClick={onPrint}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      Print
    </button>
  </div>
);

// Indoor Charges Component
const IndoorChargesSection = ({ doctorInfo, handleInputChange }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-700 mb-2">InDoor Charges</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2">
          <input
            type="text"
            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
            placeholder="Editable"
            readOnly
          />
        </div>
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="percentage"
                name="indoorShareType"
                value="percentage"
                checked={doctorInfo.indoorShareType === "percentage"}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="percentage" className="text-sm text-gray-700">
                On %Age
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="amount"
                name="indoorShareType"
                value="amount"
                checked={doctorInfo.indoorShareType === "amount"}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="amount" className="text-sm text-gray-700">
                Amount Per Case
              </label>
            </div>

            <input
              className="w-full sm:w-auto sm:flex-1 px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              name="indoorShareValue"
              value={doctorInfo.indoorShareValue}
              onChange={handleInputChange}
              placeholder={doctorInfo.indoorShareType === "percentage" ? "Enter percentage" : "Enter amount"}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
function DoctorRegistration() {
  const {
    doctorInfo,
    newOpdService,
    newIndoorService,
    setNewOpdService,
    setNewIndoorService,
    handleInputChange,
    addService,
    removeService,
    resetForm,
  } = useDoctorForm();

  const [doctorsList, setDoctorsList] = useState([
    { id: 1, consultant: "Dr Arshad", department: "OPREATION THEATER", phone: "", mobile: "0" },
    { id: 2, consultant: "Dr Atif", department: "OPREATION THEATER", phone: "", mobile: "0" },
    { id: 3, consultant: "DR EHSAN QURESHI", department: "E. N. T/OPD", phone: "", mobile: "" },
    { id: 4, consultant: "DR USMAN SHAH", department: "ORTHOPADIC", phone: "", mobile: "" },
    { id: 5, consultant: "Dr. Abdul Rab", department: "MEDICINE ALLIED", phone: "0992-380865", mobile: "0334-8987788" },
    { id: 6, consultant: "Dr. Abdul Wajid", department: "MEDICINE", phone: "", mobile: "0331-5979579" },
    { id: 7, consultant: "Dr. Adeela Aziz", department: "GYNAECOLOGY", phone: "", mobile: "0992-38410" },
    { id: 8, consultant: "Dr. Ali Akbar", department: "GENERAL SURGERY", phone: "", mobile: "0300-5642760" },
    { id: 9, consultant: "Dr. Asad-ullah", department: "EMERGENCY", phone: "", mobile: "0333-9273411" },
    { id: 10, consultant: "Dr. Aziz-ur-Rehman", department: "PSYCHIATRY", phone: "", mobile: "0333-5021955" },
    { id: 11, consultant: "Dr. Bushra Aaqil", department: "EYE", phone: "", mobile: "0331-5712992" },
    { id: 12, consultant: "Dr. Erum Saeed", department: "MEDICINE", phone: "0", mobile: "0333-5047334" },
    { id: 13, consultant: "Dr. Faiqa Gallani", department: "SENIOR MEDICAL OFFICE", phone: "", mobile: "0332-8922269" },
    { id: 14, consultant: "Dr. Fareeha Jadoon", department: "MEDICAL OFFICE", phone: "", mobile: "0300-5104090" },
  ]);

  const departmentOptions = [
    { value: "PSYCHIATRY", label: "PSYCHIATRY" },
    { value: "MEDICINE", label: "MEDICINE" },
    { value: "SURGERY", label: "SURGERY" },
    { value: "GYNAECOLOGY", label: "GYNAECOLOGY" },
    { value: "ORTHOPEDIC", label: "ORTHOPEDIC" },
    { value: "E. N. T/OPD", label: "E. N. T/OPD" },
    { value: "OPREATION THEATER", label: "OPERATION THEATER" },
    { value: "EMERGENCY", label: "EMERGENCY" },
    { value: "EYE", label: "EYE" },
    { value: "MEDICAL OFFICE", label: "MEDICAL OFFICE" },
    { value: "SENIOR MEDICAL OFFICE", label: "SENIOR MEDICAL OFFICE" },
  ];

  const surgeonTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "Surgeon", label: "Surgeon" },
    { value: "Anesthetist", label: "Anesthetist" },
    { value: "Both", label: "Both" },
  ];

  const handleAddOpdService = () => {
    setNewOpdService(addService("opdServices", newOpdService));
  };

  const handleAddIndoorService = () => {
    setNewIndoorService(addService("indoorServices", newIndoorService));
  };

  const handleRemoveOpdService = (index) => {
    removeService("opdServices", index);
  };

  const handleRemoveIndoorService = (index) => {
    removeService("indoorServices", index);
  };

  const handleSaveDoctor = () => {
    if (!doctorInfo.doctorName || !doctorInfo.department || !doctorInfo.mobile) {
      alert("Please fill all required fields (Doctor Name, Department, Mobile)");
      return;
    }

    const newDoctor = {
      id: doctorsList.length + 1,
      consultant: doctorInfo.doctorName,
      department: doctorInfo.department,
      phone: doctorInfo.residencePhone,
      mobile: doctorInfo.mobile,
    };

    setDoctorsList([...doctorsList, newDoctor]);
    resetForm();
    alert("Doctor saved successfully!");
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctorsList((prev) => prev.filter((doctor) => doctor.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-2 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-x-auto rounded-lg p-2 sm:p-5 lg:p-8">
          <div className="border bg-white rounded-lg py-5 px-4 sm:px-6 lg:px-8 mb-6 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center print:mb-4">
              DOCTOR REGISTRATION
            </h1>

            {/* Doctor Information Section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <InputField
                  label="Doctor Name"
                  name="doctorName"
                  value={doctorInfo.doctorName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter doctor name"
                />

                <SelectField
                  label="Department"
                  name="department"
                  value={doctorInfo.department}
                  onChange={handleInputChange}
                  required
                  options={departmentOptions}
                  placeholder="Select Department"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <InputField
                  label="Address"
                  name="address"
                  value={doctorInfo.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />

                <InputField
                  label="Residence Ph"
                  name="residencePhone"
                  value={doctorInfo.residencePhone}
                  onChange={handleInputChange}
                  placeholder="Enter residence phone"
                />

                <InputField
                  label="Mobile"
                  name="mobile"
                  value={doctorInfo.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 0333-5021955"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
                  Surgeon / Anesthetist
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <SelectField
                      name="surgeonType"
                      value={doctorInfo.surgeonType}
                      onChange={handleInputChange}
                      options={surgeonTypeOptions}
                      placeholder="Select Type"
                    />
                  </div>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isAnesthetist"
                        checked={doctorInfo.isAnesthetist}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          doctorInfo.isAnesthetist ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            doctorInfo.isAnesthetist ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Anesthetist</span>
                  </label>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* OPD Services Section */}
            <ServiceManagement
              title="OPD Services"
              services={doctorInfo.opdServices}
              newService={newOpdService}
              setNewService={setNewOpdService}
              charges={doctorInfo.opdCharges}
              onChargesChange={handleInputChange}
              onAddService={handleAddOpdService}
              onRemoveService={handleRemoveOpdService}
              chargesName="opdCharges"
            />

            <hr className="my-6 border-gray-300" />

            {/* InDoor Services Section */}
            <div className="mb-8">
              <ServiceManagement
                title="InDoor Services"
                services={doctorInfo.indoorServices}
                newService={newIndoorService}
                setNewService={setNewIndoorService}
                charges={doctorInfo.indoorCharges}
                onChargesChange={handleInputChange}
                onAddService={handleAddIndoorService}
                onRemoveService={handleRemoveIndoorService}
                chargesName="indoorCharges"
              />

              <IndoorChargesSection
                doctorInfo={doctorInfo}
                handleInputChange={handleInputChange}
              />
            </div>

            {/* Action Buttons */}
            <ActionButtons
              onReset={resetForm}
              onSave={handleSaveDoctor}
              onPrint={() => window.print()}
            />

            {/* Doctors Table */}
            <DoctorsTable doctors={doctorsList} onDelete={handleDeleteDoctor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegistration;