import React, { useState, useEffect } from "react";
import DateTime from "../Components/DateTime";

const OPD_Services = () => {
    const [payment, setPayment] = useState(0);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Initial services data
    const initialOpdServices = [
        { id: 1, service: "LARGE DRIP", amount: 200, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 2, service: "2 Stiches", amount: 50, consultant: "No", allowed: "Yes", selected: false },
        { id: 3, service: "4 Stiches", amount: 100, consultant: "No", allowed: "Yes", selected: false },
        { id: 4, service: "5-8 Stiches", amount: 200, consultant: "No", allowed: "Yes", selected: false },
        { id: 5, service: "ambulance charges", amount: 250, consultant: "No", allowed: "Yes", selected: false },
        { id: 6, service: "ANTERIOR NASAL PACKING", amount: 1000, consultant: "No", allowed: "Yes", selected: false },
        { id: 7, service: "Back Slab", amount: 1000, consultant: "No", allowed: "Yes", selected: false },
        { id: 8, service: "Back Slab Without Material", amount: 500, consultant: "No", allowed: "Yes", selected: false },
        { id: 9, service: "Biometry (B/E)", amount: 1500, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 10, service: "Biometry-A-Scan + Keratometry", amount: 1000, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 11, service: "Burn Dressing", amount: 200, consultant: "No", allowed: "Yes", selected: false },
        { id: 12, service: "Canola Charges", amount: 100, consultant: "No", allowed: "Yes", selected: false },
        { id: 13, service: "Catheterization Only", amount: 200, consultant: "No", allowed: "Yes", selected: false },
        { id: 14, service: "Chest Entubation", amount: 1000, consultant: "No", allowed: "Yes", selected: false },
        { id: 15, service: "Consultation", amount: 0, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 16, service: "Corneal Topography", amount: 1500, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 17, service: "Crack Card Charges", amount: 3000, consultant: "No", allowed: "Yes", selected: false },
        { id: 18, service: "Debridement of wound", amount: 1000, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 19, service: "Dressing", amount: 150, consultant: "No", allowed: "Yes", selected: false },
        { id: 20, service: "ECG", amount: 200, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 21, service: "ECHO OPD /WARD/ICU", amount: 600, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 22, service: "ECHO ON CALL", amount: 1500, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 23, service: "ECHO PRIVATE ROOM", amount: 1000, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 24, service: "Electrolysis / Catholysis", amount: 2000, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 25, service: "Excinin under L/A", amount: 2000, consultant: "Yes", allowed: "Yes", selected: false },
        { id: 26, service: "Eye wash (By Consultant)", amount: 1000, consultant: "Yes", allowed: "Yes", selected: false },
    ];

    const [services, setServices] = useState(initialOpdServices);
    const [selectedServices, setSelectedServices] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [opdInfo, setOpdInfo] = useState({
        name: "",
        amount: "",
        isFirstVisit: false,
        amountEditable: false,
        requireConsultant: false,
        allowOpdService: true,
        isLarge: false
    });

    const totalAmount = selectedServices.reduce((sum, service) => sum + service.amount, 0);
    const discountedAmount = totalAmount - discount;
    const paymentNum = parseInt(payment) || 0;
    const balance = discountedAmount - paymentNum;

    // Filter services based on search term
    const filteredServices = searchTerm.trim() === ""
        ? services
        : services.filter(service =>
            service.service.toLowerCase().includes(searchTerm.toLowerCase())
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
        if (errors.services) {
            setErrors({ ...errors, services: null });
        }
    };

    const handleCheckBoxes = (e) => {
        const { name, checked } = e.target;
        setOpdInfo(prev => ({ ...prev, [name]: checked }));
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setOpdInfo({ ...opdInfo, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleServiceAmountChange = (serviceId, newAmount) => {
        const amountValue = parseInt(newAmount) || 0;
        if (amountValue >= 0) {
            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === serviceId ? { ...service, amount: amountValue } : service
                )
            );
        }
    };

    const handleServiceAllowedChange = (serviceId, newAllowed) => {
        setServices(prevServices =>
            prevServices.map(service =>
                service.id === serviceId ? { ...service, allowed: newAllowed } : service
            )
        );
    };

    const handleDeleteService = (serviceId) => {
        setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
        setServices(prevServices =>
            prevServices.map(service =>
                service.id === serviceId ? { ...service, selected: false } : service
            )
        );
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

    const validateForm = () => {
        const newErrors = {};
        if (!opdInfo.name.trim()) newErrors.name = "OPD Service name is required";
        if (!opdInfo.amount.trim()) newErrors.amount = "Amount is required";
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
        alert("Receipt saved successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-6 md:mb-8 print:mb-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 print:text-black">
                        OPD Services
                    </h1>
                </header>

                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 print:grid-cols-1 print:gap-4">
                    {/* Left Column - Patient Info & Services */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 print:space-y-4">
                        {/* Receipt Header Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 sm:border-l-8 border-blue-600 print:border-l-4 print:p-4 print:shadow-none print:border">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 print:mb-3">
                                <div className="w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                                        <h2 className="text-xl sm:text-2xl font-bold text-blue-800 print:text-black">
                                            OPD Services
                                        </h2>
                                        {/* Date & Time */}
                                        <DateTime />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 print:space-y-2">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 print:gap-2">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            OPD Service <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            name="name"
                                            value={opdInfo.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Any OPD Service"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Amount <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full py-1 px-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                                            name="amount"
                                            value={opdInfo.amount}
                                            onChange={handleInputChange}
                                            placeholder="Enter Amount"
                                            type="number"
                                        />
                                        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                                    {/* Amount Editable Checkbox */}
                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="amountEditable"
                                                    checked={opdInfo.amountEditable}
                                                    onChange={handleCheckBoxes}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${opdInfo.amountEditable ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${opdInfo.amountEditable ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Amount Editable</span>
                                        </label>
                                    </div>

                                    {/* Require Consultant Checkbox */}
                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="requireConsultant"
                                                    checked={opdInfo.requireConsultant}
                                                    onChange={handleCheckBoxes}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${opdInfo.requireConsultant ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${opdInfo.requireConsultant ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Require Consultant</span>
                                        </label>
                                    </div>

                                    {/* Allow OPD Service Checkbox */}
                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="allowOpdService"
                                                    checked={opdInfo.allowOpdService}
                                                    onChange={handleCheckBoxes}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${opdInfo.allowOpdService ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${opdInfo.allowOpdService ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Allow OPD Service</span>
                                        </label>
                                    </div>

                                    {/* Large OPD Receipt Checkbox */}
                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="isLarge"
                                                    checked={opdInfo.isLarge}
                                                    onChange={handleCheckBoxes}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${opdInfo.isLarge ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${opdInfo.isLarge ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Large OPD Receipt</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* OPD Services Table */}
                        <div className="bg-white overflow-y-auto max-h-[60vh] rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 print:shadow-none print:border print:p-4">
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
                                        placeholder="Search services by name..."
                                        className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
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

                            {/* Services Table */}
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                                        <tr>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-16">
                                                Select
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-12">
                                                SR.#
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                                SERVICE
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-32">
                                                AMOUNT
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-32">
                                                CONSULTANT
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-32">
                                                ALLOWED
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredServices.map((service) => {
                                            const isSelected = service.selected;
                                            return (
                                                <tr
                                                    key={service.id}
                                                    className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                                                    onClick={() => toggleService(service.id)}
                                                >
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                                                {isSelected && (
                                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-medium text-sm">
                                                            {service.id}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {service.service}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        {opdInfo.amountEditable ? (
                                                            <input
                                                                type="number"
                                                                value={service.amount}
                                                                onChange={(e) => handleServiceAmountChange(service.id, e.target.value)}
                                                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                onClick={(e) => e.stopPropagation()}
                                                                min="0"
                                                            />
                                                        ) : (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                                Rs.{service.amount}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${service.consultant === 'Yes' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                            {service.consultant === 'Yes' ? (
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                            {service.consultant}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        {opdInfo.allowOpdService ? (
                                                            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleServiceAllowedChange(service.id, "Yes")}
                                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${service.allowed === "Yes" ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-800 border border-gray-300'}`}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleServiceAllowedChange(service.id, "No")}
                                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${service.allowed === "No" ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-800 border border-gray-300'}`}
                                                                >
                                                                    No
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${service.allowed === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                {service.allowed === 'Yes' ? (
                                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                    </svg>
                                                                )}
                                                                {service.allowed}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 print:hidden">
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 text-sm shadow-md hover:shadow-lg active:shadow-sm border border-gray-300"
                                    onClick={() => {
                                        setServices(services.map((s) => ({ ...s, selected: false })));
                                        setSelectedServices([]);
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

                    {/* Right Column - Summary */}
                </div>
            </div>
        </div>
    );
};

export default OPD_Services;