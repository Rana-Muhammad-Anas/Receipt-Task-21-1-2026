import { useState, useEffect, useRef } from "react";

function Consultant_Timing() {
    const consultantData = [
        {
            "sr": 1,
            "consultant": "Dr. Abdul Rab",
            "speciality": "Pulmonologist",
            "days": "Tuesday, Thursday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0334-8987788",
            "fee": "1500"
        },
        {
            "sr": 2,
            "consultant": "Dr. Aziz-ur-Rehman",
            "speciality": "Psychiatrist",
            "days": "Wednesday, Friday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0333-50231955",
            "fee": "1200"
        },
        {
            "sr": 3,
            "consultant": "Dr. Bibi Sara",
            "speciality": "Gynaecology",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0321-9319828",
            "fee": "2000"
        },
        {
            "sr": 4,
            "consultant": "Dr. Bushra Aaqil",
            "speciality": "EYE",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0331-5712992",
            "fee": "1200"
        },
        {
            "sr": 5,
            "consultant": "Dr. Ehsan Qureshi",
            "speciality": "ENT",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0333 5071392",
            "fee": "1800"
        },
        {
            "sr": 6,
            "consultant": "Dr. Erum Saeed",
            "speciality": "Medical Specialist",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0333-5047334",
            "fee": "2000"
        },
        {
            "sr": 7,
            "consultant": "Dr. Haleema Nazneen",
            "speciality": "ENT",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0345-7351144",
            "fee": "1000"
        },
        {
            "sr": 8,
            "consultant": "Dr. M. Aamir Khan",
            "speciality": "EYE",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0303-5450054",
            "fee": "1200"
        },
        {
            "sr": 9,
            "consultant": "Dr. Mehmood A.Malik",
            "speciality": "Paediatrics",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0334-3441263",
            "fee": "700"
        },
        {
            "sr": 10,
            "consultant": "Dr. Nafeesa Malik",
            "speciality": "Gynaecology",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0332-8144007",
            "fee": "800"
        },
        {
            "sr": 11,
            "consultant": "Dr. Rashid Ali",
            "speciality": "Medical Specialist",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0321-9812182",
            "fee": "2000"
        },
        {
            "sr": 12,
            "consultant": "Dr. Saleem Awan",
            "speciality": "Cardiologist",
            "days": "Monday, Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0300-0115667 / 0332-",
            "fee": "1500"
        },
        {
            "sr": 13,
            "consultant": "Dr. Samson Graffin",
            "speciality": "Surgical Specialist",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0314-5018000",
            "fee": "1200"
        },
        {
            "sr": 14,
            "consultant": "Dr. Sayed Ali Akbar",
            "speciality": "Surgical Specialist",
            "days": "Monday - Saturday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0300-5642760",
            "fee": "1000"
        },
        {
            "sr": 15,
            "consultant": "Dr. Syed Usman Shah",
            "speciality": "Orthopaedic",
            "days": "Tuesday, Thursday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0346-0270000",
            "fee": "900"
        },
        {
            "sr": 16,
            "consultant": "Dr. Zahid ur Rehman",
            "speciality": "Darmatology (Skin)",
            "days": "Tuesday",
            "timings": "08:00 AM - 02:00 PM",
            "hospital": "WMCTH",
            "contact": "0312-0532102",
            "fee": "1500"
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
    });
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredConsultants, setFilteredConsultants] = useState(consultantData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Filter consultants based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredConsultants(consultantData);
        } else {
            const filtered = consultantData.filter(consultant =>
                consultant.consultant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                consultant.speciality.toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        
        if (name === "searchQuery") {
            setSearchQuery(value);
            return;
        }
        
        if (name === "consultant" && value) {
            const selectedConsultant = consultantData.find(item => item.consultant === value);
            if (selectedConsultant) {
                setConsultantInfo({
                    consultant: selectedConsultant.consultant,
                    speciality: selectedConsultant.speciality,
                    days: selectedConsultant.days,
                    timings: selectedConsultant.timings,
                    hospital: selectedConsultant.hospital,
                    phone: selectedConsultant.contact,
                    fee: selectedConsultant.fee,
                });
                setIsDropdownOpen(false);
                setSearchQuery("");
            }
            return;
        }
        
        setConsultantInfo({ ...consultantInfo, [name]: value });
    };

    const handleTableRowClick = (consultant) => {
        setConsultantInfo({
            consultant: consultant.consultant,
            speciality: consultant.speciality,
            days: consultant.days,
            timings: consultant.timings,
            hospital: consultant.hospital,
            phone: consultant.contact,
            fee: consultant.fee,
        });
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    const handleSelectConsultant = (consultant) => {
        setConsultantInfo({
            consultant: consultant.consultant,
            speciality: consultant.speciality,
            days: consultant.days,
            timings: consultant.timings,
            hospital: consultant.hospital,
            phone: consultant.contact,
            fee: consultant.fee,
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
            <div className="mx-auto">
                <div className="overflow-x-auto rounded-lg p-10">
                    <div className="border bg-white rounded py-5 px-5 mb-6">
                        <div className="flex space justify-between ">
                            <h1 className="text-2xl font-bold text-gray-800 mb-3 print:mb-2">
                                Consultant Information
                            </h1>
                        </div>

                        <div className="space-y-3 print:space-y-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 print:gap-2">
                                <div className="col-span-2 relative" ref={dropdownRef}>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Consultant <span className="text-red-500">*</span>
                                    </label>
                                    
                                    {/* Custom dropdown with search */}
                                    <div className="relative">
                                        <div 
                                            onClick={handleDropdownToggle}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 cursor-pointer flex justify-between items-center"
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
                                                {/* Search input */}
                                                <div className="sticky top-0 bg-white p-2 border-b">
                                                    <input
                                                        type="text"
                                                        name="searchQuery"
                                                        value={searchQuery}
                                                        onChange={handleInputChange}
                                                        placeholder="Search consultant or speciality..."
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        autoFocus
                                                    />
                                                </div>
                                                
                                                {/* Consultant list */}
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
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 print:grid-cols-4 print:gap-2">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Speciality <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="speciality"
                                        value={consultantInfo.speciality}
                                        onChange={handleInputChange}
                                        placeholder="Consultant Speciality"
                                        type="text"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Days <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="days"
                                        value={consultantInfo.days}
                                        onChange={handleInputChange}
                                        placeholder="Consultant Days"
                                        type="text"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        From Hospital <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="hospital"
                                        value={consultantInfo.hospital}
                                        onChange={handleInputChange}
                                        placeholder="Enter Hospital Name"
                                        type="text"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Timings
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="timings"
                                        value={consultantInfo.timings}
                                        onChange={handleInputChange}
                                        placeholder="Timing"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Contact No. <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full py-2 px-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="phone"
                                        value={consultantInfo.phone}
                                        onChange={handleInputChange}
                                        placeholder="11 digit phone number"
                                        type="tel"
                                        maxLength="11"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 print:text-black">
                                        Fee
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="fee"
                                        value={consultantInfo.fee}
                                        onChange={handleInputChange}
                                        placeholder="Enter Fee"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider w-16">
                                        SR.#
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        CONSULTANT
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        SPECIALITY
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        DAYS
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        TIMINGS
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        HOSPITAL
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        CONTACT
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        FEE
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {consultantData.map((consultant) => (
                                    <tr
                                        key={consultant.sr}
                                        onClick={() => handleTableRowClick(consultant)}
                                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                    >
                                        <td className="px-2 py-1 whitespace-nowrap">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-medium text-sm">
                                                {consultant.sr}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1">
                                            <div className="text-sm font-medium text-gray-900">
                                                {consultant.consultant}
                                            </div>
                                        </td>
                                        <td className="px-2 py-1">
                                            <div className="text-sm text-gray-700">
                                                {consultant.speciality}
                                            </div>
                                        </td>
                                        <td className="px-2 py-1">
                                            <span className="text-sm text-gray-700">
                                                {consultant.days}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 whitespace-nowrap">
                                            <span className="text-sm text-gray-700">
                                                {consultant.timings}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1">
                                            <span className="text-sm text-gray-700">
                                                {consultant.hospital}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1">
                                            <span className="text-sm text-gray-700">
                                                {consultant.contact}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 whitespace-nowrap">
                                            {consultant.fee ? (
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    consultant.fee === 'New' ? 'bg-green-100 text-green-800' :
                                                    consultant.fee === 'Modify' ? 'bg-yellow-100 text-yellow-800' :
                                                    consultant.fee === 'Delete' ? 'bg-red-100 text-red-800' :
                                                    consultant.fee === 'Exit' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {consultant.fee === 'New' && (
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    {consultant.fee === 'Modify' && (
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    )}
                                                    {consultant.fee === 'Delete' && (
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    {consultant.fee === 'Exit' && (
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    {consultant.fee}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultant_Timing;