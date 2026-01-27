import { useState, useEffect, useRef } from "react";
import DateTime from "../Components/DateTime";

// Custom hook for consultant form state management
const useConsultantForm = () => {
    const initialConsultantInfo = {
        consultant: "",
        speciality: "",
        days: "",
        timings: "",
        hospital: "WMCTH",
        phone: "",
        fee: "",
    };

    const [consultantInfo, setConsultantInfo] = useState(initialConsultantInfo);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConsultantInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setConsultantInfo(initialConsultantInfo);
    };

    const loadConsultant = (consultant) => {
        setConsultantInfo({
            consultant: consultant.consultant,
            speciality: consultant.speciality,
            days: consultant.days,
            timings: consultant.timings,
            hospital: consultant.hospital,
            phone: consultant.contact,
            fee: consultant.fee,
        });
    };

    return {
        consultantInfo,
        handleInputChange,
        resetForm,
        loadConsultant,
        setConsultantInfo,
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

// Modern Search Dropdown Component
const SearchDropdown = ({
    label,
    value,
    onChange,
    onSelect,
    options,
    searchQuery,
    setSearchQuery,
    isOpen,
    setIsOpen,
    className = "",
    required
}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const handleSelect = (consultant) => {
        onSelect(consultant);
        setIsOpen(false);
        setSearchQuery("");
    };

    const filteredOptions = searchQuery.trim() === ""
        ? options
        : options.filter(item =>
            item.consultant.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.speciality.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex justify-between items-center transition-all duration-200"
                >
                    <span className={value ? "text-gray-900" : "text-gray-400 truncate"}>
                        {value || "Select Consultant"}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
                        <div className="sticky top-0 bg-white p-3 border-b">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search consultant or speciality..."
                                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-64">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((consultant) => (
                                    <div
                                        key={consultant.sr}
                                        onClick={() => handleSelect(consultant)}
                                        className="px-2 py-1 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="font-medium text-gray-900 text-sm">{consultant.consultant}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{consultant.speciality}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-500">No consultants found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Modern Doctors Table Component
const ConsultantsTable = ({ consultants, onSelect, selectedId }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'sr', direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedConsultants = [...consultants].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const SortIcon = ({ columnKey }) => (
        <span className="ml-1 inline-block w-4">
            {sortConfig.key === columnKey ? (
                sortConfig.direction === 'ascending' ? '↑' : '↓'
            ) : '↕'}
        </span>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Consultants Directory</h2>
                        <p className="text-sm text-gray-600 mt-1">Click any consultant to view/edit details</p>
                    </div>
                    <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                        Total: {consultants.length} consultant{consultants.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <button onClick={() => handleSort('sr')} className="flex items-center hover:text-blue-600 transition-colors">
                                    SR.# <SortIcon columnKey="sr" />
                                </button>
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <button onClick={() => handleSort('consultant')} className="flex items-center hover:text-blue-600 transition-colors">
                                    CONSULTANT <SortIcon columnKey="consultant" />
                                </button>
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                                <button onClick={() => handleSort('speciality')} className="flex items-center hover:text-blue-600 transition-colors">
                                    SPECIALITY <SortIcon columnKey="speciality" />
                                </button>
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                                <button onClick={() => handleSort('days')} className="flex items-center hover:text-blue-600 transition-colors">
                                    AVAILABLE DAYS <SortIcon columnKey="days" />
                                </button>
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                                TIMINGS
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden 2xl:table-cell">
                                CONTACT
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                FEE
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedConsultants.map((consultant) => (
                            <tr
                                key={consultant.sr}
                                onClick={() => onSelect(consultant)}
                                className={`hover:bg-blue-50 transition-colors duration-150 cursor-pointer ${selectedId === consultant.sr ? 'bg-blue-50' : ''}`}
                            >
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                                        {consultant.sr}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <div className="text-sm font-semibold text-gray-900">{consultant.consultant}</div>
                                            <div className="text-xs text-gray-500 md:hidden">{consultant.speciality}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 hidden md:table-cell">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        {consultant.speciality}
                                    </span>
                                </td>
                                <td className="px-4 py-2 hidden lg:table-cell">
                                    <div className="text-sm text-gray-700">{consultant.days}</div>
                                </td>
                                <td className="px-4 py-2 hidden xl:table-cell">
                                    <div className="flex items-center text-sm text-gray-700">
                                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {consultant.timings}
                                    </div>
                                </td>
                                <td className="px-4 py-2 hidden 2xl:table-cell">
                                    <div className="text-sm text-gray-700 flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {consultant.contact}
                                    </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                        Rs. {consultant.fee}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${consultant.days.includes('Monday - Saturday') ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        <span className="text-xs text-gray-600">
                                            {consultant.days.includes('Monday - Saturday') ? 'Full Week' : 'Part Time'}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {consultants.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No consultants found</h3>
                    <p className="mt-1 text-sm text-gray-500">Add your first consultant using the form above.</p>
                </div>
            )}
        </div>
    );
};

// Modern Action Buttons Component
const ActionButtons = ({ onNew, onSave, onPrint, isEditing }) => (
    <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
            onClick={onNew}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Consultant
        </button>
        <button
            onClick={onPrint}
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Schedule
        </button>
        <button
            onClick={onSave}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {isEditing ? 'Update' : 'Save'} Consultant
        </button>
    </div>
);

// Main Component
function Consultant_Timing() {
    const consultantData = [
        { "sr": 1, "consultant": "Dr. Abdul Rab", "speciality": "Pulmonologist", "days": "Tuesday, Thursday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0334-8987788", "fee": "1500" },
        { "sr": 2, "consultant": "Dr. Aziz-ur-Rehman", "speciality": "Psychiatrist", "days": "Wednesday, Friday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0333-50231955", "fee": "1200" },
        { "sr": 3, "consultant": "Dr. Bibi Sara", "speciality": "Gynaecology", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0321-9319828", "fee": "2000" },
        { "sr": 4, "consultant": "Dr. Bushra Aaqil", "speciality": "EYE", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0331-5712992", "fee": "1200" },
        { "sr": 5, "consultant": "Dr. Ehsan Qureshi", "speciality": "ENT", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0333 5071392", "fee": "1800" },
        { "sr": 6, "consultant": "Dr. Erum Saeed", "speciality": "Medical Specialist", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0333-5047334", "fee": "2000" },
        { "sr": 7, "consultant": "Dr. Haleema Nazneen", "speciality": "ENT", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0345-7351144", "fee": "1000" },
        { "sr": 8, "consultant": "Dr. M. Aamir Khan", "speciality": "EYE", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0303-5450054", "fee": "1200" },
        { "sr": 9, "consultant": "Dr. Mehmood A.Malik", "speciality": "Paediatrics", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0334-3441263", "fee": "700" },
        { "sr": 10, "consultant": "Dr. Nafeesa Malik", "speciality": "Gynaecology", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0332-8144007", "fee": "800" },
        { "sr": 11, "consultant": "Dr. Rashid Ali", "speciality": "Medical Specialist", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0321-9812182", "fee": "2000" },
        { "sr": 12, "consultant": "Dr. Saleem Awan", "speciality": "Cardiologist", "days": "Monday, Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0300-0115667", "fee": "1500" },
        { "sr": 13, "consultant": "Dr. Samson Graffin", "speciality": "Surgical Specialist", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0314-5018000", "fee": "1200" },
        { "sr": 14, "consultant": "Dr. Sayed Ali Akbar", "speciality": "Surgical Specialist", "days": "Monday - Saturday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0300-5642760", "fee": "1000" },
        { "sr": 15, "consultant": "Dr. Syed Usman Shah", "speciality": "Orthopaedic", "days": "Tuesday, Thursday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0346-0270000", "fee": "900" },
        { "sr": 16, "consultant": "Dr. Zahid ur Rehman", "speciality": "Darmatology (Skin)", "days": "Tuesday", "timings": "08:00 AM - 02:00 PM", "hospital": "WMCTH", "contact": "0312-0532102", "fee": "1500" }
    ];

    const {
        consultantInfo,
        handleInputChange,
        resetForm,
        loadConsultant,
    } = useConsultantForm();

    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedConsultantId, setSelectedConsultantId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSelectConsultant = (consultant) => {
        loadConsultant(consultant);
        setSelectedConsultantId(consultant.sr);
        setIsEditing(true);
    };

    const handleSaveConsultant = () => {
        if (!consultantInfo.consultant || !consultantInfo.speciality || !consultantInfo.days) {
            alert("Please fill all required fields (Consultant, Speciality, Days)");
            return;
        }

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn';
        notification.textContent = isEditing ? 'Consultant updated successfully!' : 'New consultant saved successfully!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('animate-slideIn');
            notification.classList.add('animate-slideOut');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);

        resetForm();
        setSelectedConsultantId(null);
        setIsEditing(false);
    };

    const handleNewConsultant = () => {
        resetForm();
        setSelectedConsultantId(null);
        setIsEditing(false);
    };

    const handlePrintSchedule = () => {
        window.print();
    };

    // Add CSS animation styles
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

    const daysOptions = [
        { value: "Monday - Saturday", label: "Monday - Saturday" },
        { value: "Monday - Friday", label: "Monday - Friday" },
        { value: "Monday, Wednesday, Friday", label: "Monday, Wednesday, Friday" },
        { value: "Tuesday, Thursday", label: "Tuesday, Thursday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday, Friday", label: "Wednesday, Friday" },
        { value: "Monday, Saturday", label: "Monday, Saturday" },
    ];

    const timingOptions = [
        { value: "08:00 AM - 02:00 PM", label: "Morning (08:00 AM - 02:00 PM)" },
        { value: "02:00 PM - 08:00 PM", label: "Afternoon (02:00 PM - 08:00 PM)" },
        { value: "08:00 AM - 08:00 PM", label: "Full Day (08:00 AM - 08:00 PM)" },
        { value: "09:00 AM - 05:00 PM", label: "Office Hours (09:00 AM - 05:00 PM)" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                Consultant Timings
                            </h1>
                        </div>
                        <DateTime />
                    </div>
                </header>

                <div className="space-y-6">
                    {/* Consultant Information Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center mb-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {isEditing ? 'Edit Consultant' : 'Add New Consultant'}
                                </h2>
                                <p className="text-gray-600">
                                    {isEditing ? 'Update consultant details' : 'Enter new consultant information'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Consultant Selection */}
                            <SearchDropdown
                                label="Consultant"
                                value={consultantInfo.consultant}
                                onChange={(e) => handleInputChange({
                                    target: { name: 'consultant', value: e.target.value }
                                })}
                                onSelect={handleSelectConsultant}
                                options={consultantData}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                isOpen={isDropdownOpen}
                                setIsOpen={setIsDropdownOpen}
                                required
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <InputField
                                    label="Speciality"
                                    name="speciality"
                                    value={consultantInfo.speciality}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter speciality"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    }
                                />

                                <SelectField
                                    label="Available Days"
                                    name="days"
                                    value={consultantInfo.days}
                                    onChange={handleInputChange}
                                    required
                                    options={daysOptions}
                                    placeholder="Select available days"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <SelectField
                                    label="Consultation Timings"
                                    name="timings"
                                    value={consultantInfo.timings}
                                    onChange={handleInputChange}
                                    options={timingOptions}
                                    placeholder="Select consultation timings"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />

                                <InputField
                                    label="Hospital"
                                    name="hospital"
                                    value={consultantInfo.hospital}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter hospital name"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <InputField
                                    label="Contact Number"
                                    name="phone"
                                    value={consultantInfo.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., 0333-5021955"
                                    type="tel"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    }
                                />

                                <InputField
                                    label="Consultation Fee"
                                    name="fee"
                                    value={consultantInfo.fee}
                                    onChange={handleInputChange}
                                    placeholder="Enter consultation fee"
                                    type="number"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4">
                                <ActionButtons
                                    onNew={handleNewConsultant}
                                    onSave={handleSaveConsultant}
                                    onPrint={handlePrintSchedule}
                                    isEditing={isEditing}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Consultants Table */}
                    <ConsultantsTable
                        consultants={consultantData}
                        onSelect={handleSelectConsultant}
                        selectedId={selectedConsultantId}
                    />
                </div>
            </div>
        </div>
    );
}

export default Consultant_Timing;