import { useState, useEffect, useRef } from "react";
import DateTime from "../Components/DateTime";

function Consultant_Appointment() {
    const consultantData = [
        {
            "sr": 1,
            "consultant": "Dr. Abdul Rab",
            "speciality": "Cardiology",
            "Date": "Tuesday, Thursday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0334-8987788",
            "fee": "2000"
        },
        {
            "sr": 2,
            "consultant": "Dr. Aziz-ur-Rehman",
            "speciality": "Neurology",
            "Date": "Wednesday, Friday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0333-50231955",
            "fee": "2500"
        },
        {
            "sr": 3,
            "consultant": "Dr. Bibi Sara",
            "speciality": "Pediatrics",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0321-9319828",
            "fee": "1500"
        },
        {
            "sr": 4,
            "consultant": "Dr. Bushra Aaqil",
            "speciality": "Gynecology",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0331-5712992",
            "fee": "1800"
        },
        {
            "sr": 5,
            "consultant": "Dr. Ehsan Qureshi",
            "speciality": "Orthopedics",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0333 5071392",
            "fee": "2200"
        },
        {
            "sr": 6,
            "consultant": "Dr. Erum Saeed",
            "speciality": "Dermatology",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0333-5047334",
            "fee": "1600"
        },
        {
            "sr": 7,
            "consultant": "Dr. Haleema Nazneen",
            "speciality": "Psychiatry",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0345-7351144",
            "fee": "2000"
        },
        {
            "sr": 8,
            "consultant": "Dr. M. Aamir Khan",
            "speciality": "General Surgery",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0303-5450054",
            "fee": "3000"
        },
        {
            "sr": 9,
            "consultant": "Dr. Mehmood A.Malik",
            "speciality": "ENT",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0334-3441263",
            "fee": "1700"
        },
        {
            "sr": 10,
            "consultant": "Dr. Nafeesa Malik",
            "speciality": "Ophthalmology",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0332-8144007",
            "fee": "1900"
        },
        {
            "sr": 11,
            "consultant": "Dr. Rashid Ali",
            "speciality": "Urology",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0321-9812182",
            "fee": "2800"
        },
        {
            "sr": 12,
            "consultant": "Dr. Saleem Awan",
            "speciality": "Dentistry",
            "Date": "Monday, Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "03034891550",
            "fee": "1200"
        },
        {
            "sr": 13,
            "consultant": "Dr. Samson Graffin",
            "speciality": "Physiotherapy",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0314-5018000",
            "fee": "1400"
        },
        {
            "sr": 14,
            "consultant": "Dr. Sayed Ali Akbar",
            "speciality": "Gastroenterology",
            "Date": "Monday - Saturday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0300-5642760",
            "fee": "2600"
        },
        {
            "sr": 15,
            "consultant": "Dr. Syed Usman Shah",
            "speciality": "Oncology",
            "Date": "Tuesday, Thursday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0346-0270000",
            "fee": "3500"
        },
        {
            "sr": 16,
            "consultant": "Dr. Zahid ur Rehman",
            "speciality": "Endocrinology",
            "Date": "Tuesday",
            "time": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "phone": "0312-0532102",
            "fee": "2400"
        }
    ];

    const [consultantInfo, setConsultantInfo] = useState({
        consultant: "",
        speciality: "",
        days: "",
        timings: "",
        hospital: "",
        phone: "",
        fee: "",
        followUpCharges: "",
    });

    const [patientInfo, setPatientInfo] = useState({
        name: "",
        address: "",
        contact: "",
        appointmentTime: "",
        isFirstVisit: false,
    });

    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredConsultants, setFilteredConsultants] = useState(consultantData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [appointmentId, setAppointmentId] = useState("");
    const dropdownRef = useRef(null);

    // Generate appointment ID on component mount
    useEffect(() => {
        const generateAppointmentId = () => {
            const timestamp = Date.now();
            const randomNum = Math.floor(Math.random() * 1000);
            return `APT-${timestamp.toString().slice(-6)}-${randomNum.toString().padStart(3, '0')}`;
        };
        setAppointmentId(generateAppointmentId());
    }, []);

    // Filter consultants based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredConsultants(consultantData);
        } else {
            const filtered = consultantData.filter(consultant =>
                consultant.consultant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (consultant.speciality && consultant.speciality.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredConsultants(filtered);
        }
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleConsultantInputChange = (e) => {
        const { name, value } = e.target;
        setConsultantInfo({ ...consultantInfo, [name]: value });
    };

    const handlePatientInputChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo({ ...patientInfo, [name]: value });
    };

    const handleFirstVisitChange = (e) => {
        setPatientInfo({ ...patientInfo, isFirstVisit: e.target.checked });
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectConsultant = (consultant) => {
        setConsultantInfo({
            consultant: consultant.consultant,
            speciality: consultant.speciality,
            days: consultant.Date,
            timings: consultant.time,
            hospital: consultant.hospital,
            phone: consultant.phone,
            fee: consultant.fee,
            followUpCharges: Math.floor(parseInt(consultant.fee) * 0.7).toString(), // 70% of original fee
        });
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setSearchQuery("");
            setFilteredConsultants(consultantData);
        }
    };

    const handleAddAppointment = () => {
        if (!consultantInfo.consultant || !patientInfo.name || !patientInfo.contact) {
            alert("Please fill all required fields (*)");
            return;
        }

        const newAppointment = {
            sr: appointments.length + 1,
            appointmentId: appointmentId,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            }),
            time: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            consultant: consultantInfo.consultant,
            consultantSpeciality: consultantInfo.speciality,
            patientName: patientInfo.name,
            patientContact: patientInfo.contact,
            patientAddress: patientInfo.address,
            appointmentTime: patientInfo.appointmentTime,
            isFirstVisit: patientInfo.isFirstVisit,
            fee: consultantInfo.fee,
            followUpCharges: consultantInfo.followUpCharges,
        };

        setAppointments([...appointments, newAppointment]);
        
        // Reset patient info
        setPatientInfo({
            name: "",
            address: "",
            contact: "",
            appointmentTime: "",
            isFirstVisit: false,
        });

        // Generate new appointment ID for next appointment
        const generateNewId = () => {
            const timestamp = Date.now();
            const randomNum = Math.floor(Math.random() * 1000);
            return `APT-${timestamp.toString().slice(-6)}-${randomNum.toString().padStart(3, '0')}`;
        };
        setAppointmentId(generateNewId());
    };

    const handleRemoveAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        // Update serial numbers
        const renumberedAppointments = updatedAppointments.map((appointment, idx) => ({
            ...appointment,
            sr: idx + 1
        }));
        setAppointments(renumberedAppointments);
    };

    const handleClearAll = () => {
        setConsultantInfo({
            consultant: "",
            speciality: "",
            days: "",
            timings: "",
            hospital: "",
            phone: "",
            fee: "",
            followUpCharges: "",
        });
        setPatientInfo({
            name: "",
            address: "",
            contact: "",
            appointmentTime: "",
            isFirstVisit: false,
        });
        setAppointments([]);
        const generateNewId = () => {
            const timestamp = Date.now();
            const randomNum = Math.floor(Math.random() * 1000);
            return `APT-${timestamp.toString().slice(-6)}-${randomNum.toString().padStart(3, '0')}`;
        };
        setAppointmentId(generateNewId());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
            <div className="mx-auto">
                <div className="overflow-x-auto rounded-lg p-10">
                    <div className="border bg-white rounded py-5 px-5 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-3 print:mb-2">
                            Consultant Appointment
                        </h1>
                        
                        <div className="flex space justify-between mb-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 print:text-black">
                                    Appointment ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-1/2 px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                    name="appointmentId"
                                    value={appointmentId}
                                    readOnly
                                />
                            </div>
                            <DateTime />
                        </div>

                        {/* Consultant Information Section */}
                        <div className="border border-gray-300 rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Consultant Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative" ref={dropdownRef}>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Consultant <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div
                                                onClick={handleDropdownToggle}
                                                className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 cursor-pointer flex justify-between items-center"
                                            >
                                                <span className={consultantInfo.consultant ? "text-gray-900" : "text-gray-400"}>
                                                    {consultantInfo.consultant || "Select Consultant"}
                                                </span>
                                                <svg
                                                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>

                                            {isDropdownOpen && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <input
                                                            type="text"
                                                            name="searchQuery"
                                                            value={searchQuery}
                                                            onChange={handleSearchQueryChange}
                                                            placeholder="Search consultant or speciality..."
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="py-1">
                                                        {filteredConsultants.length > 0 ? (
                                                            filteredConsultants.map((consultant) => (
                                                                <div
                                                                    key={consultant.sr}
                                                                    onClick={() => handleSelectConsultant(consultant)}
                                                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
                                                                >
                                                                    <div className="font-medium text-gray-900">{consultant.consultant}</div>
                                                                    <div className="text-xs text-gray-500">{consultant.speciality}</div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-3 py-3 text-center text-sm text-gray-500">
                                                                No consultants found
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Speciality
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="speciality"
                                            value={consultantInfo.speciality}
                                            onChange={handleConsultantInputChange}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Consultation Fee <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="fee"
                                            value={consultantInfo.fee}
                                            onChange={handleConsultantInputChange}
                                            placeholder="Fee"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Follow-Up Visit Charges
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="followUpCharges"
                                            value={consultantInfo.followUpCharges}
                                            onChange={handleConsultantInputChange}
                                            placeholder="Follow-up charges"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Available Days
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="days"
                                            value={consultantInfo.days}
                                            onChange={handleConsultantInputChange}
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Timings
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="timings"
                                            value={consultantInfo.timings}
                                            onChange={handleConsultantInputChange}
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Hospital
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="hospital"
                                            value={consultantInfo.hospital}
                                            onChange={handleConsultantInputChange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Patient Information Section */}
                        <div className="border border-gray-300 rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Patient Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="name"
                                            value={patientInfo.name}
                                            onChange={handlePatientInputChange}
                                            placeholder="Enter patient name"
                                        />
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Contact No. <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="contact"
                                            value={patientInfo.contact}
                                            onChange={handlePatientInputChange}
                                            placeholder="11 digit phone number"
                                            maxLength="11"
                                        />
                                    </div>
                                    <div className="col-span-1 flex items-end">
                                        <div className="flex items-center h-full">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={patientInfo.isFirstVisit}
                                                        onChange={handleFirstVisitChange}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${patientInfo.isFirstVisit ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${patientInfo.isFirstVisit ? 'translate-x-5' : ''}`}></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">First Visit</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Address
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="address"
                                            value={patientInfo.address}
                                            onChange={handlePatientInputChange}
                                            placeholder="Enter patient address"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 print:text-black">
                                            Preferred Appointment Time
                                        </label>
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                            name="appointmentTime"
                                            value={patientInfo.appointmentTime}
                                            onChange={handlePatientInputChange}
                                            placeholder="e.g., 10:00 AM"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={handleClearAll}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={handleAddAppointment}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Appointment
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Appointments Table */}
                        {appointments.length > 0 && (
                            <div className="border border-gray-300 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments List</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Sr#</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Appointment ID</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Date</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Time</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Consultant</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Patient Name</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Phone No.</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Visit Type</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Fee</th>
                                                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appointment, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="py-2 px-4 border-b text-sm">{appointment.sr}</td>
                                                    <td className="py-2 px-4 border-b text-sm font-medium">{appointment.appointmentId}</td>
                                                    <td className="py-2 px-4 border-b text-sm">{appointment.date}</td>
                                                    <td className="py-2 px-4 border-b text-sm">{appointment.time}</td>
                                                    <td className="py-2 px-4 border-b text-sm">
                                                        <div>
                                                            <div className="font-medium">{appointment.consultant}</div>
                                                            <div className="text-xs text-gray-500">{appointment.consultantSpeciality}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-sm">{appointment.patientName}</td>
                                                    <td className="py-2 px-4 border-b text-sm">{appointment.patientContact}</td>
                                                    <td className="py-2 px-4 border-b text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.isFirstVisit ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                            {appointment.isFirstVisit ? 'First Visit' : 'Follow-up'}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-sm">
                                                        Rs. {appointment.isFirstVisit ? appointment.fee : appointment.followUpCharges}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        <button
                                                            onClick={() => handleRemoveAppointment(index)}
                                                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    Total Appointments: <span className="font-semibold">{appointments.length}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultant_Appointment;