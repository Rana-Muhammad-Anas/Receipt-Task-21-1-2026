import React, { useState, useEffect } from "react";
import firstAid from "../../public/first-aid.png";
import consulting from "../../public/consulting.png";
import laboratory from "../../public/laboratory.png";
import xray from "../../public/xray.png";
import mri from "../../public/mri.png";
import eye from "../../public/eye.png";
import teeth from "../../public/teeth.png";

const Receipt = () => {
  const [activeTab, setActiveTab] = useState('OPD');
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [payment, setPayment] = useState(0);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [receiptNo, setReceiptNo] = useState(""); // State for receipt number
  const [mrNo, setMrNo] = useState(""); // State for MR number
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isOpen, setIsOpen] = useState(false);     // Toggle Effect for Selected Services

  // Initial services data
  const initialServices = [
    { id: 1, name: "OPD", selected: false, price: 1000, description: "Full Body", icon: firstAid },
    { id: 2, name: "Laboratory", selected: false, price: 1000, description: "1000ml 3 Items", icon: laboratory },
    { id: 3, name: "MRI", selected: false, price: 2500, description: "Full Body MRI", icon: mri },
    { id: 4, name: "Consultation", selected: false, price: 500, description: "Doctor Consultation", icon: consulting },
    { id: 5, name: "X-RAY", selected: false, price: 800, description: "Digital X-Ray", icon: xray },
    { id: 6, name: "Eye Checkup", selected: false, price: 400, description: "Complete Eye Exam", icon: eye },
    { id: 7, name: "Dental Checkup", selected: false, price: 600, description: "Dental Examination", icon: teeth },
  ];

  const [services, setServices] = useState(initialServices);
  const [selectedServices, setSelectedServices] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    address: "",
    age: "",
    gender: "",
    phone: "",
    reference: "General Physician",
    panel: "",
    city: "",
  });

  const totalAmount = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const discountedAmount = totalAmount - discount;
  const paymentNum = parseInt(payment) || 0;
  const balance = discountedAmount - paymentNum;
  const isOverpaid = balance < 0;
  const returnAmount = isOverpaid ? Math.abs(balance) : 0;

  // Filter services based on search term
  const filteredServices = searchTerm.trim() === ""
    ? services
    : services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const selected = services.filter((service) => service.selected);
    setSelectedServices(selected);
  }, [services]);

  const toggleService = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, selected: !service.selected } : service
      )
    );
    // Clear service selection error when user selects a service
    if (errors.services) {
      setErrors({ ...errors, services: null });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "gender") {
      const v = value.toLowerCase();
      if (v === "m" || v === "male") value = "Male";
      else if (v === "f" || v === "female") value = "Female";
      else value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setPatientInfo({ ...patientInfo, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleReceiptNoChange = (e) => {
    setReceiptNo(e.target.value);
    if (errors.receiptNo) {
      setErrors({ ...errors, receiptNo: null });
    }
  };

  const handleMrNoChange = (e) => {
    setMrNo(e.target.value);
    if (errors.mrNo) {
      setErrors({ ...errors, mrNo: null });
    }
  };

  const handleSelectChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleDiscountChange = (e) => {
    let value = e.target.value;
    value = value.replace(/^0+(?=\d)/, "");
    if (value === "" || parseInt(value) < 0) value = "0";
    if (parseInt(value) > totalAmount) value = totalAmount.toString();
    setDiscount(value);
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    value = value.replace(/^0+(?=\d)/, "");
    if (value === "" || parseInt(value) < 0) value = "0";
    setPayment(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!receiptNo.trim()) newErrors.receiptNo = "Receipt No. is required";
    if (!mrNo.trim()) newErrors.mrNo = "MR No. is required";
    if (!patientInfo.name.trim()) newErrors.name = "Patient name is required";
    if (!patientInfo.address.trim()) newErrors.address = "Address is required";
    if (!patientInfo.age.trim()) newErrors.age = "Age is required";
    if (!patientInfo.gender.trim()) newErrors.gender = "Gender is required";
    if (!patientInfo.phone.trim()) newErrors.phone = "Phone number is required";

    // Validate phone number format (11 digits)
    if (patientInfo.phone.trim() && !/^\d{11}$/.test(patientInfo.phone.trim())) {
      newErrors.phone = "Phone must be 11 digits";
    }

    // Validate age (must be number between 1-120)
    if (patientInfo.age.trim()) {
      const ageNum = parseInt(patientInfo.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = "Age must be between 1 and 120";
      }
    }

    // Check if at least one service is selected
    if (selectedServices.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrint = () => {
    if (!validateForm()) {
      alert("Please fill all required fields correctly before printing.");
      return;
    }
    window.print();
  };

  const handleSaveExit = () => {
    if (!validateForm()) {
      alert("Please fill all required fields correctly before saving.");
      return;
    }
    // Save logic here
    alert("Receipt saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 md:mb-8 print:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 print:text-black">
            HIMS OPD System
          </h1>
          <p className="text-blue-700 text-sm sm:text-base print:text-gray-700">
            Counter 01 - Patient Receipt Management
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 print:grid-cols-1 print:gap-4">
          {/* Left Column - Patient Info & Services */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 print:space-y-4">
            {/* Receipt Header Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 sm:border-l-8 border-blue-600 print:border-l-4 print:p-4 print:shadow-none print:border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 print:mb-3">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-800 print:text-black">
                      OPD RECEIPT - COUNTER 01
                    </h2>
                    {/* Date & Time */}
                    <div className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto print:bg-gray-100 print:text-black">
                      <div className="font-bold text-sm sm:text-base">
                        {now.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs sm:text-sm">
                        {now.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div>
                <div className="flex space justify-between ">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 print:mb-2">
                    Patient Information <span className="text-red-500">*</span>
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600 text-sm">Receipt No:</span>
                    <div>
                      <input
                        className={`w-32 px-2 py-1 border rounded text-gray-900 bg-[#edf9ff] text-sm print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none ${errors.receiptNo ? 'border-red-500' : 'border-gray-300'}`}
                        value={receiptNo}
                        onChange={handleReceiptNoChange}
                        placeholder="Enter receipt no."
                      />
                      {errors.receiptNo && <p className="text-red-500 text-xs mt-1">{errors.receiptNo}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 my-1">
                  <span className="text-gray-600 text-sm">MR No:</span>
                  <div>
                    <input
                      className={`w-32 px-2 py-1 border rounded text-gray-900 bg-[#edf9ff] text-sm print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none ${errors.mrNo ? 'border-red-500' : 'border-gray-300'}`}
                      value={mrNo}
                      onChange={handleMrNoChange}
                      placeholder="Enter MR no."
                    />
                    {errors.mrNo && <p className="text-red-500 text-xs mt-1">{errors.mrNo}</p>}
                  </div>
                </div>
                <div className="space-y-3 print:space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 print:gap-2">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        name="name"
                        value={patientInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter patient name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        name="phone"
                        value={patientInfo.phone}
                        onChange={handleInputChange}
                        placeholder="11 digit phone number"
                        type="tel"
                        maxLength="11"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 print:grid-cols-4 print:gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                        name="age"
                        value={patientInfo.age}
                        onChange={handleInputChange}
                        placeholder="Age (1-120)"
                        type="number"
                        min="1"
                        max="120"
                      />
                      {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                        name="gender"
                        value={patientInfo.gender}
                        onChange={handleInputChange}
                        placeholder="M/F For Male/Female"
                      />
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        name="address"
                        value={patientInfo.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="col-span-1 ">
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        City
                      </label>
                      <input
                        className={`w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        name="city"
                        value={patientInfo.city}
                        onChange={handleInputChange}
                        placeholder="Enter City"
                        type="name"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Panel
                      </label>
                      <select
                        name="panel"
                        value={patientInfo.panel}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0"
                      >
                        <option value="General Physician">General Physician</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="General Surgeon">General Surgeon</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 print:text-black">
                        Reference
                      </label>
                      <select
                        name="reference"
                        value={patientInfo.reference}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0"
                      >
                        <option value="General Physician">General Physician</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="General Surgeon">General Surgeon</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OPD Services */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 print:shadow-none print:border print:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 print:mb-3">
                <h3 className="text-xl font-bold text-gray-800 print:text-black">
                  OPD Services <span className="text-red-500">*</span>
                </h3>
                <div className="text-sm text-gray-600 mt-1 sm:mt-0 print:text-gray-700">
                  {selectedServices.length} services selected
                </div>
              </div>
              {errors.services && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{errors.services}</p>
                </div>
              )}

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search services by name or description..."
                    className="w-full px-4 py-2.5 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredServices.length} of {services.length} services
                    {filteredServices.length === 0 && (
                      <span className="text-red-500 ml-2">No services found for "{searchTerm}"</span>
                    )}
                  </div>
                )}
              </div>

              {/* Scrollable container with fixed height */}
              <div className="grid grid-cols-5">
                <div className="max-h-[200px] sm:max-h-[220px] md:max-h-[240px] overflow-y-auto pr-2 mb-4 col-span-2" style={{
                  direction: "rtl",
                }}>
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-2.5 sm:gap-3 print:grid-cols-4 print:gap-2" style={{ direction: "ltr" }}>
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className={`p-2.5 sm:p-3 rounded-xl border-2 cursor-pointer transition-all items-center duration-200 
                        hover:shadow-md active:scale-[0.98] min-h-[100px] sm:min-h-[110px] 
                        flex flex-col justify-between relative group print:min-h-[90px] print:p-2 ${service.selected
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md"
                            : "border-gray-200 hover:border-blue-300 bg-white"
                          }`}
                        onClick={() => toggleService(service.id)}
                      >
                        {/* Toggle Indicator */}
                        <div className="absolute -top-1.5 -right-1.5">
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md transition-all ${service.selected
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 scale-100"
                              : "bg-gradient-to-br from-gray-200 to-gray-300 scale-90 group-hover:scale-100"
                              }`}
                          >
                            {service.selected && (
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Service Content */}
                        <div className="flex-1 ">
                          <div className="mb-1.5">
                            <img className="w-12 h-10" src={service.icon} alt="" />
                            <h4 className="font-bold text-gray-800 text-xs sm:text-sm print:text-xs leading-tight line-clamp-2">
                              {service.name}
                            </h4>
                          </div>
                          <p className="text-[10px] xs:text-xs text-gray-600 print:text-xs leading-tight line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-blue-600 text-xs sm:text-sm print:text-xs">
                              Rs.{service.price}
                            </span>
                            {service.selected && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                Selected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 max-h-[200px] sm:max-h-[220px] md:max-h-[240px] overflow-y-auto pr-2 mb-4 border-2 border-black rounded-lg">
                  <div className="col-span-2">
                    <div className="mb-4 sm:mb-6 print:mb-3">
                      <h4 className="font-medium text-gray-700 mb-2 sm:mb-3 print:text-black text-center">
                        Selected Services
                      </h4>
                      <div className="max-h-48 sm:max-h-64">
                        {selectedServices.length > 0 ? (
                          <div className="space-y-1 sm:space-y-2">
                            {selectedServices.map((service, index) => (
                              <div
                                key={service.id}
                                className="flex justify-between items-center py-2 border-b border-gray-100 text-sm sm:text-base print:text-sm"
                              >
                                <div className="truncate max-w-[60%]">
                                  <span className="ml-2 text-xs text-gray-500 px-2">
                                    #{index + 1}
                                  </span>
                                  <span className="font-medium text-gray-800">
                                    {service.name}
                                  </span>

                                </div>
                                <span className="font-medium whitespace-nowrap">Rs.{service.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500 text-sm sm:text-base">
                            No services selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 print:hidden">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm shadow-md hover:shadow-lg active:shadow-sm"
                  onClick={() => {
                    setServices(services.map((s) => ({ ...s, selected: true })));
                    if (errors.services) {
                      setErrors({ ...errors, services: null });
                    }
                  }}
                >
                  Select All Services
                </button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 text-sm shadow-md hover:shadow-lg active:shadow-sm border border-gray-300"
                  onClick={() => {
                    setServices(services.map((s) => ({ ...s, selected: false })));
                    if (!errors.services) {
                      setErrors({ ...errors, services: "Please select at least one service" });
                    }
                  }}
                >
                  Clear Selection
                </button>
                {searchTerm && (
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 text-sm shadow-md hover:shadow-lg active:shadow-sm border border-gray-300"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 print:space-y-4">
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto bg-white p-4 rounded-xl sm:rounded-2xl">
              <div className=" mx-auto bg-blue-100 px-3 py-5 rounded">
                {/* Tabs */}
                <div className="flex space-x-1 border-b mb-6">
                  {['OPD', 'IPD', 'Tokens'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 bg-white border-blue-500 text-blue-800' : 'text-gray-500'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow p-4 h-[calc(46vh-100px)] overflow-y-auto">
                  {activeTab === 'OPD' && (
                    <div className="">
                      <h2 className="text-lg font-semibold mb-4">OPD Tab</h2>
                      <p className="text-gray-600">OPD data goes here</p>
                      {/* Add your OPD data table or content here */}
                    </div>
                  )}

                  {activeTab === 'IPD' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">IPD Tab</h2>
                      <p className="text-gray-600">IPD data goes here</p>
                      {/* Add your IPD data table or content here */}
                    </div>
                  )}

                  {activeTab === 'Tokens' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Tokens Tab</h2>
                      <p className="text-gray-600">Tokens data goes here</p>
                      {/* Add your Tokens data table or content here */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Payment Summary Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4 print:static print:shadow-none print:border print:p-4">
              {/* <div className="flex justify-between">
                <h3 className="text-xl font-bold text-gray-800 mb-4 sm:mb-6 print:text-black print:mb-3">
                  Payment Summary
                </h3>
                <button className="text-green-800" onClick={handleToggle}> Selected Services </button>
                {isOpen ? <div>
                  <div className="mb-4 sm:mb-6 print:mb-3">
                    <div className="max-h-40 sm:max-h-50 overflow-y-auto">
                      {selectedServices.length > 0 ? (
                        <div className="space-y-1 sm:space-y-2">
                          {selectedServices.map((service, index) => (
                            <div
                              key={service.id}
                              className="flex justify-between items-center py-2 border-b border-gray-100 text-sm sm:text-base print:text-sm"
                            >
                              <div className="truncate max-w-[60%]">
                                <span className="ml-2 text-xs text-gray-500 px-2">
                                  #{index + 1}
                                </span>
                                <span className="font-medium text-gray-800">
                                  {service.name}
                                </span>
                              </div>
                              <span className="font-medium whitespace-nowrap">Rs.{service.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm sm:text-base">
                          No services selected
                        </div>
                      )}
                    </div>
                  </div>
                </div> : ""}
             </div> */}






<div className="flex justify-between items-start mb-4">
  <h3 className="text-xl font-bold text-gray-800 sm:mb-6 print:text-black print:mb-3">
    Payment Summary
  </h3>
  
  <div className="relative">
    {/* Toggle Button */}
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium text-xs rounded-lg border border-green-200 shadow-sm transition-all duration-200 hover:shadow active:scale-95"
    >
      <span>Selected Services</span>
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {/* Dropdown Content */}
    {isOpen && (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn">
        <div className="p-3 border-b border-gray-100">
          <h4 className="font-semibold text-gray-800">Selected Services List</h4>
        </div>
        
        <div className="max-h-64 overflow-y-auto p-2">
          {selectedServices.length > 0 ? (
            <div className="space-y-2">
              {selectedServices.map((service, index) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center min-w-0">
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-800 truncate">
                      {service.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 whitespace-nowrap ml-2">
                    Rs.{service.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 text-sm">No services selected</p>
            </div>
          )}
        </div>
        
        {selectedServices.length > 0 && (
          <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">Total Items: {selectedServices.length}</span>
              <span className="font-bold text-gray-900">
                Total: Rs.{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
</div>

             
              {/* Amount Calculation */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 print:space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Services Total</span>
                  <span className="font-medium">Rs.{totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Discount</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">Rs.</span>
                    <input
                      type="number"
                      min="0"
                      max={totalAmount}
                      value={discount}
                      onChange={handleDiscountChange}
                      className="w-20 sm:w-24 p-2 border border-gray-300 rounded-lg text-right text-sm print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:w-20"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="flex justify-between font-bold text-sm sm:text-base">
                    <span>Total Payable</span>
                    <span className="text-blue-700">Rs.{discountedAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Amount Paid */}
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Amount Paid</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">Rs.</span>
                    <input
                      type="number"
                      min="0"
                      value={payment}
                      onChange={handlePaymentChange}
                      className="w-20 sm:w-24 p-2 border border-gray-300 rounded-lg text-right text-green-600 font-bold text-sm print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:w-20"
                    />
                  </div>
                </div>

                {/* Balance */}
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Balance</span>
                  <span className={`font-bold ${balance < 0 ? 'text-red-600' : balance > 0 ? 'text-yellow-600' : 'text-gray-900'}`}>
                    Rs.{Math.abs(balance).toFixed(2)}
                  </span>
                </div>

                {/* Return Payment (only shown when overpaid) */}
                {isOverpaid && (
                  <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-300 text-sm sm:text-base">
                    <span className="text-gray-700">Return Payment</span>
                    <span className="font-bold text-red-600">Rs.{returnAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 print:hidden">
                <button
                  className="w-full py-2 px-3
               bg-gray-100 text-gray-800 font-medium rounded-lg
               hover:bg-gray-200 transition-colors
               text-sm
               disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSaveExit}
                >
                  Save & Exit
                </button>

                <button
                  className="w-full py-2 px-3
               bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg
               hover:opacity-90 transition-opacity
               text-sm
               disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePrint}
                >
                  Print Receipt
                </button>
              </div>


              {/* Validation Summary */}
              {(() => {
                const hasErrors = Object.values(errors).some(error => error && error.trim());

                if (hasErrors) {
                  return (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium mb-1">Please fix the following errors:</p>
                      <ul className="text-red-500 text-xs list-disc pl-4">
                        {Object.entries(errors)
                          .filter(([_, error]) => error && error.trim())
                          .map(([key, error]) => (
                            <li key={key}>{error}</li>
                          ))
                        }
                      </ul>
                    </div>
                  );
                }
                return null;
              })()}
              {/* Receipt Status */}
              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg border ${paymentNum === 0 ? 'bg-gray-50 border-gray-200' :
                isOverpaid ? 'bg-yellow-50 border-yellow-200' :
                  balance === 0 ? 'bg-green-50 border-green-200' :
                    'bg-orange-50 border-orange-200'
                } print:p-3`}>
                <div className="flex items-center">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 ${paymentNum === 0 ? 'bg-gray-400' :
                    isOverpaid ? 'bg-yellow-500' :
                      balance === 0 ? 'bg-green-500' :
                        'bg-orange-500'
                    }`}></div>
                  <div>
                    <div className={`font-medium text-sm sm:text-base print:text-sm ${paymentNum === 0 ? 'text-gray-800' :
                      isOverpaid ? 'text-yellow-800' :
                        balance === 0 ? 'text-green-800' :
                          'text-orange-800'
                      }`}>
                      {paymentNum === 0 ? 'No Payment Made' :
                        isOverpaid ? `Overpaid - Return Rs.${returnAmount.toFixed(2)}` :
                          balance === 0 ? 'Fully Paid' :
                            `Partially Paid - Due: Rs.${balance.toFixed(2)}`}
                    </div>
                    <div className={`text-xs print:text-xs ${paymentNum === 0 ? 'text-gray-700' :
                      isOverpaid ? 'text-yellow-700' :
                        balance === 0 ? 'text-green-700' :
                          'text-orange-700'
                      }`}>
                      {paymentNum === 0 ? 'Please enter payment amount' :
                        isOverpaid ? 'Patient needs to receive return payment' :
                          balance === 0 ? 'All services have been processed' :
                            `Remaining balance to be paid: Rs.${balance.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm print:mt-4 print:text-xs print:text-black">
          <p>OPD Receipt System v2.0 • This is a computer-generated receipt</p>
          <p className="mt-1">For any queries, contact the hospital administration desk</p>
        </footer>
      </div>
    </div>
  );
};

export default Receipt;