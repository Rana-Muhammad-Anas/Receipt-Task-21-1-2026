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
            followUpCharges: Math.floor(parseInt(consultant.fee) * 0.7).toString(),
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
                <div className="rounded-lg p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                    <div className="border bg-white rounded-lg py-4 sm:py-5 px-4 sm:px-5 mb-6 shadow-lg">
                        {/* Header with Icons */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    Consultant Appointment
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">Book and manage medical appointments</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <div className="w-full sm:w-auto">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    Appointment ID <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full sm:w-64 px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-blue-50 text-sm sm:text-base border-gray-300"
                                        name="appointmentId"
                                        value={appointmentId}
                                        readOnly
                                    />
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto">
                                <DateTime />
                            </div>
                        </div>

                        {/* Consultant Information Section */}
                        <div className="border border-gray-400 rounded-xl p-4 sm:p-6 mb-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Consultant Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative" ref={dropdownRef}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Consultant <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div
                                                onClick={handleDropdownToggle}
                                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer flex justify-between items-center hover:border-blue-400 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className={consultantInfo.consultant ? "text-gray-900" : "text-gray-400"}>
                                                        {consultantInfo.consultant || "Select Consultant"}
                                                    </span>
                                                </div>
                                                <svg
                                                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>

                                            {isDropdownOpen && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <div className="relative">
                                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                            <input
                                                                type="text"
                                                                name="searchQuery"
                                                                value={searchQuery}
                                                                onChange={handleSearchQueryChange}
                                                                placeholder="Search consultant or speciality..."
                                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="py-1">
                                                        {filteredConsultants.length > 0 ? (
                                                            filteredConsultants.map((consultant) => (
                                                                <div
                                                                    key={consultant.sr}
                                                                    onClick={() => handleSelectConsultant(consultant)}
                                                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                                                                >
                                                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">{consultant.consultant}</div>
                                                                        <div className="text-xs text-gray-500">{consultant.speciality}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-3 py-3 text-center text-sm text-gray-500">
                                                                <svg className="w-6 h-6 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                No consultants found
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Speciality
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="speciality"
                                                value={consultantInfo.speciality}
                                                onChange={handleConsultantInputChange}
                                                readOnly
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Consultation Fee <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="fee"
                                                value={consultantInfo.fee}
                                                onChange={handleConsultantInputChange}
                                                placeholder="Fee"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Follow-Up Visit Charges
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="followUpCharges"
                                                value={consultantInfo.followUpCharges}
                                                onChange={handleConsultantInputChange}
                                                placeholder="Follow-up charges"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Available Days
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="days"
                                                value={consultantInfo.days}
                                                onChange={handleConsultantInputChange}
                                                readOnly
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Timings
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="timings"
                                                value={consultantInfo.timings}
                                                onChange={handleConsultantInputChange}
                                                readOnly
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Hospital
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="hospital"
                                                value={consultantInfo.hospital}
                                                onChange={handleConsultantInputChange}
                                                readOnly
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Patient Information Section */}
                        <div className="border border-gray-400 rounded-xl p-4 sm:p-6 mb-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Patient Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Patient Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="name"
                                                value={patientInfo.name}
                                                onChange={handlePatientInputChange}
                                                placeholder="Enter patient name"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Contact No. <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="contact"
                                                value={patientInfo.contact}
                                                onChange={handlePatientInputChange}
                                                placeholder="11 digit phone number"
                                                maxLength="11"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-span-1 sm:col-span-1 flex items-end">
                                        <div className="flex items-center h-full w-full">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={patientInfo.isFirstVisit}
                                                        onChange={handleFirstVisitChange}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${patientInfo.isFirstVisit ? 'bg-green-600' : 'bg-blue-600'}`}>
                                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${patientInfo.isFirstVisit ? 'translate-x-6' : ''}`}>
                                                            {patientInfo.isFirstVisit ? (
                                                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">First Visit</span>
                                                    <div className="text-xs text-gray-500">{patientInfo.isFirstVisit ? 'Enabled' : 'Follow-up'}</div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="address"
                                                value={patientInfo.address}
                                                onChange={handlePatientInputChange}
                                                placeholder="Enter patient address"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            Preferred Appointment Time
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-1 pl-10 border rounded-lg text-gray-900 bg-white text-sm sm:text-base border-gray-300"
                                                name="appointmentTime"
                                                value={patientInfo.appointmentTime}
                                                onChange={handlePatientInputChange}
                                                placeholder="e.g., 10:00 AM"
                                            />
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                                    <button
                                        onClick={handleClearAll}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear All
                                    </button>
                                    <button
                                        onClick={handleAddAppointment}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Appointment
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Appointments Table */}
                        {appointments.length > 0 && (
                            <div className="border border-gray-300 rounded-xl p-4 sm:p-6 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Appointments List</h2>
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Total Appointments: <span className="font-semibold">{appointments.length}</span>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                        </svg>
                                                        <span>Sr#</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                        <span>Appt ID</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700 hidden sm:table-cell">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Date</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Time</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span>Consultant</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <span>Patient</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700 hidden md:table-cell">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <span>Phone</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Type</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Fee</span>
                                                    </div>
                                                </th>
                                                <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Actions</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appointment, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm">{appointment.sr}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm font-medium truncate max-w-[100px]">{appointment.appointmentId}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm hidden sm:table-cell">{appointment.date}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm">{appointment.time}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <div>
                                                                <div className="font-medium truncate max-w-[120px] sm:max-w-[150px]">{appointment.consultant}</div>
                                                                <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">{appointment.consultantSpeciality}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">{appointment.patientName}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm hidden md:table-cell">{appointment.patientContact}</td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${appointment.isFirstVisit ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                            {appointment.isFirstVisit ? (
                                                                <>
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    First
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                                    </svg>
                                                                    Follow-up
                                                                </>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-xs sm:text-sm flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Rs. {appointment.isFirstVisit ? appointment.fee : appointment.followUpCharges}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        <button
                                                            onClick={() => handleRemoveAppointment(index)}
                                                            className="px-2 sm:px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs sm:text-sm flex items-center gap-1"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Total Revenue: <span className="font-bold text-green-600">Rs. {appointments.reduce((total, app) => total + parseInt(app.isFirstVisit ? app.fee : app.followUpCharges), 0)}</span></span>
                                    </div>
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