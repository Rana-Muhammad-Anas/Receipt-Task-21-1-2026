import { useState, useEffect } from "react";
import DateTime from "../Components/DateTime";

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
    isSurgeon: false,
    isActiveForIndoor: false,
    isActiveForOPD: false,
    opdServices: [],
    opdCharges: "",
    indoorServices: [],
    indoorCharges: "",
    indoorShareType: "percentage",
    indoorShareValue: "",
    opdShareType: "percentage",
    opdShareValue: "",
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

// Modern Input Field Component
const InputField = ({ label, name, value, onChange, required, placeholder, type = "text", className = "", icon, ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full px-3 py-2 ${icon ? 'pl-10' : 'pl-3'} border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          }`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  </div>
);

// Modern Select Field Component
const SelectField = ({ label, name, value, onChange, required, options, placeholder, className = "", icon }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <select
        className={`w-full px-3 py-2 ${icon ? 'pl-10' : 'pl-3'} border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none`}
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
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// Modern Toggle Switch Component
const ToggleSwitch = ({ label, name, checked, onChange, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-gray-300'
          }`} />
        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : ''
          }`} />
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
    </label>
  </div>
);

// Charges Configuration Component
const ChargesConfiguration = ({ 
  title, 
  shareType, 
  shareValue, 
  onShareTypeChange, 
  onShareValueChange, 
  shareTypeName,
  shareValueName,
  className = "" 
}) => (
  <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
    <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="radio"
            id={`${shareTypeName}-percentage`}
            name={shareTypeName}
            value="percentage"
            checked={shareType === "percentage"}
            onChange={onShareTypeChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor={`${shareTypeName}-percentage`} className="ml-2 text-sm text-gray-700">
            On Percentage
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id={`${shareTypeName}-amount`}
            name={shareTypeName}
            value="amount"
            checked={shareType === "amount"}
            onChange={onShareTypeChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor={`${shareTypeName}-amount`} className="ml-2 text-sm text-gray-700">
            Amount per Case
          </label>
        </div>
      </div>

      <div className="sm:flex-1">
        <div className="relative">
          <input
            name={shareValueName}
            value={shareValue}
            onChange={onShareValueChange}
            placeholder={shareType === "percentage" ? "Enter percentage" : "Enter amount"}
            type="number"
            className="w-full px-3 py-2 pl-3 border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {shareType === "percentage" && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              %
            </div>
          )}
        </div>
      </div>
    </div>
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
  serviceType = "opd",
  shareType,
  shareValue,
  onShareTypeChange,
  onShareValueChange,
  shareTypeName,
  shareValueName,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 pb-0">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
      <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{title}</h2>
      <div className="text-sm text-gray-600">
        {services.length} service{services.length !== 1 ? 's' : ''} added
      </div>
    </div>

    <div className="mb-3">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-2">
        <div className="lg:col-span-2">
          <InputField
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder={`Enter ${serviceType} service name`}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        </div>
        <div className="col-span-2">
          <InputField
            name={chargesName}
            value={charges}
            onChange={onChargesChange}
            placeholder="Enter charges"
            type="number"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={onAddService}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    {/* Charges Configuration Section */}
    <ChargesConfiguration
      shareType={shareType}
      shareValue={shareValue}
      onShareTypeChange={onShareTypeChange}
      onShareValueChange={onShareValueChange}
      shareTypeName={shareTypeName}
      shareValueName={shareValueName}
      className="mb-6"
    />

    {services.length > 0 && (
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-600 mb-3">Added Services</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-sm text-gray-800 truncate">{service}</span>
              <button
                onClick={() => onRemoveService(index)}
                className="ml-2 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                aria-label="Remove service"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Modern Doctors Table Component
const DoctorsTable = ({ doctors, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'consultant', direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const SortIcon = ({ columnKey }) => (
    <span className="ml-1">
      {sortConfig.key === columnKey ? (
        sortConfig.direction === 'ascending' ? '↑' : '↓'
      ) : '↕'}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Registered Doctors</h2>
        <div className="text-sm text-gray-600">
          Total: {doctors.length} doctor{doctors.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <button onClick={() => handleSort('id')} className="flex items-center hover:text-blue-600">
                  Sr.# <SortIcon columnKey="id" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <button onClick={() => handleSort('consultant')} className="flex items-center hover:text-blue-600">
                  CONSULTANT <SortIcon columnKey="consultant" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                <button onClick={() => handleSort('department')} className="flex items-center hover:text-blue-600">
                  DEPARTMENT <SortIcon columnKey="department" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                PHONE
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                MOBILE
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDoctors.map((doctor, index) => (
              <tr key={doctor.id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-semibold text-gray-900">{doctor.consultant}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {doctor.department}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="text-sm text-gray-700">
                    {doctor.phone || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {doctor.mobile || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(doctor.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No doctors registered yet</h3>
          <p className="mt-1 text-sm text-gray-500">Add your first doctor using the form above.</p>
        </div>
      )}
    </div>
  );
};

// Modern Action Buttons Component
const ActionButtons = ({ onReset, onSave, onPrint }) => (
  <div className="flex flex-col sm:flex-row justify-end gap-3 mb-8">
    <button
      onClick={onReset}
      className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      New Doctor
    </button>
    <button
      onClick={onPrint}
      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print
    </button>
    <button
      onClick={onSave}
      className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      Save Doctor
    </button>
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
    { id: 1, consultant: "Dr Arshad", department: "OPERATION THEATER", phone: "", mobile: "0" },
    { id: 2, consultant: "Dr Atif", department: "OPERATION THEATER", phone: "", mobile: "0" },
    { id: 3, consultant: "DR EHSAN QURESHI", department: "E.N.T/OPD", phone: "", mobile: "" },
    { id: 4, consultant: "DR USMAN SHAH", department: "ORTHOPEDIC", phone: "", mobile: "" },
    { id: 5, consultant: "Dr. Abdul Rab", department: "MEDICINE ALLIED", phone: "0992-380865", mobile: "0334-8987788" },
    { id: 6, consultant: "Dr. Abdul Wajid", department: "MEDICINE", phone: "", mobile: "0331-5979579" },
    { id: 7, consultant: "Dr. Adeela Aziz", department: "GYNAECOLOGY", phone: "", mobile: "0992-38410" },
    { id: 8, consultant: "Dr. Ali Akbar", department: "GENERAL SURGERY", phone: "", mobile: "0300-5642760" },
    { id: 9, consultant: "Dr. Asad-ullah", department: "EMERGENCY", phone: "", mobile: "0333-9273411" },
    { id: 10, consultant: "Dr. Aziz-ur-Rehman", department: "PSYCHIATRY", phone: "", mobile: "0333-5021955" },
    { id: 11, consultant: "Dr. Bushra Aaqil", department: "OPHTHALMOLOGY", phone: "", mobile: "0331-5712992" },
    { id: 12, consultant: "Dr. Erum Saeed", department: "MEDICINE", phone: "0", mobile: "0333-5047334" },
    { id: 13, consultant: "Dr. Faiqa Gallani", department: "SENIOR MEDICAL OFFICE", phone: "", mobile: "0332-8922269" },
    { id: 14, consultant: "Dr. Fareeha Jadoon", department: "MEDICAL OFFICE", phone: "", mobile: "0300-5104090" },
  ]);

  const departmentOptions = [
    { value: "PSYCHIATRY", label: "Psychiatry" },
    { value: "MEDICINE", label: "Medicine" },
    { value: "SURGERY", label: "Surgery" },
    { value: "GYNAECOLOGY", label: "Gynaecology" },
    { value: "ORTHOPEDIC", label: "Orthopedic" },
    { value: "E.N.T/OPD", label: "E.N.T/OPD" },
    { value: "OPERATION THEATER", label: "Operation Theater" },
    { value: "EMERGENCY", label: "Emergency" },
    { value: "OPHTHALMOLOGY", label: "Ophthalmology" },
    { value: "MEDICAL OFFICE", label: "Medical Office" },
    { value: "SENIOR MEDICAL OFFICE", label: "Senior Medical Office" },
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

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn';
    notification.textContent = 'Doctor saved successfully!';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove('animate-slideIn');
      notification.classList.add('animate-slideOut');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctorsList((prev) => prev.filter((doctor) => doctor.id !== id));

      // Show delete notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn';
      notification.textContent = 'Doctor deleted successfully!';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.remove('animate-slideIn');
        notification.classList.add('animate-slideOut');
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
    }
  };

  // Add CSS animation styles to head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      .animate-slideIn {
        animation: slideIn 0.3s ease-out;
      }
      .animate-slideOut {
        animation: slideOut 0.3s ease-in;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Doctor Registration
              </h1>
            </div>
            <DateTime />
          </div>
        </header>

        <div className="space-y-6">
          {/* Doctor Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">Doctor Information</h2>
                <p className="text-gray-600">Enter basic details about the doctor</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Doctor Name"
                  name="doctorName"
                  value={doctorInfo.doctorName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter doctor's full name"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <SelectField
                  label="Department"
                  name="department"
                  value={doctorInfo.department}
                  onChange={handleInputChange}
                  required
                  options={departmentOptions}
                  placeholder="Select department"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="Address"
                  name="address"
                  value={doctorInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter hospital address"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />

                <InputField
                  label="Residence Phone"
                  name="residencePhone"
                  value={doctorInfo.residencePhone}
                  onChange={handleInputChange}
                  placeholder="Enter residence phone"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  value={doctorInfo.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 0333-5021955"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
                <ToggleSwitch
                  label="Surgeon"
                  name="isSurgeon"
                  checked={doctorInfo.isSurgeon}
                  onChange={handleInputChange}
                />

                <ToggleSwitch
                  label="Anesthetist"
                  name="isAnesthetist"
                  checked={doctorInfo.isAnesthetist}
                  onChange={handleInputChange}
                />

                <ToggleSwitch
                  label="Active for OPD"
                  name="isActiveForOPD"
                  checked={doctorInfo.isActiveForOPD}
                  onChange={handleInputChange}
                />

                <ToggleSwitch
                  label="Active for Indoor"
                  name="isActiveForIndoor"
                  checked={doctorInfo.isActiveForIndoor}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* OPD Services */}
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
              serviceType="opd"
              shareType={doctorInfo.opdShareType}
              shareValue={doctorInfo.opdShareValue}
              onShareTypeChange={handleInputChange}
              onShareValueChange={handleInputChange}
              shareTypeName="opdShareType"
              shareValueName="opdShareValue"
            />

            {/* Indoor Services */}
            <ServiceManagement
              title="Indoor Services"
              services={doctorInfo.indoorServices}
              newService={newIndoorService}
              setNewService={setNewIndoorService}
              charges={doctorInfo.indoorCharges}
              onChargesChange={handleInputChange}
              onAddService={handleAddIndoorService}
              onRemoveService={handleRemoveIndoorService}
              chargesName="indoorCharges"
              serviceType="indoor"
              shareType={doctorInfo.indoorShareType}
              shareValue={doctorInfo.indoorShareValue}
              onShareTypeChange={handleInputChange}
              onShareValueChange={handleInputChange}
              shareTypeName="indoorShareType"
              shareValueName="indoorShareValue"
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
  );
}

export default DoctorRegistration;