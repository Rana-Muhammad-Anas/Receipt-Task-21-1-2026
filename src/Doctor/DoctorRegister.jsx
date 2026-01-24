import { useState } from "react";

function DoctorRegistration() {
    const [doctorInfo, setDoctorInfo] = useState({
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
        indoorShareType: "percentage", // percentage or amount
        indoorShareValue: "",
    });

    const [newOpdService, setNewOpdService] = useState("");
    const [newIndoorService, setNewIndoorService] = useState("");
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDoctorInfo({
            ...doctorInfo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddOpdService = () => {
        if (newOpdService.trim()) {
            setDoctorInfo({
                ...doctorInfo,
                opdServices: [...doctorInfo.opdServices, newOpdService.trim()]
            });
            setNewOpdService("");
        }
    };

    const handleRemoveOpdService = (index) => {
        const updatedServices = doctorInfo.opdServices.filter((_, i) => i !== index);
        setDoctorInfo({ ...doctorInfo, opdServices: updatedServices });
    };

    const handleAddIndoorService = () => {
        if (newIndoorService.trim()) {
            setDoctorInfo({
                ...doctorInfo,
                indoorServices: [...doctorInfo.indoorServices, newIndoorService.trim()]
            });
            setNewIndoorService("");
        }
    };

    const handleRemoveIndoorService = (index) => {
        const updatedServices = doctorInfo.indoorServices.filter((_, i) => i !== index);
        setDoctorInfo({ ...doctorInfo, indoorServices: updatedServices });
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
            mobile: doctorInfo.mobile
        };

        setDoctorsList([...doctorsList, newDoctor]);
        
        // Reset form
        setDoctorInfo({
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
        });
        
        setNewOpdService("");
        setNewIndoorService("");
        
        alert("Doctor saved successfully!");
    };

    const handleDeleteDoctor = (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            const updatedList = doctorsList.filter(doctor => doctor.id !== id);
            setDoctorsList(updatedList);
        }
    };

    const handleNewDoctor = () => {
        setDoctorInfo({
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
        });
        setNewOpdService("");
        setNewIndoorService("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8 print:bg-white print:p-0">
            <div className="mx-auto">
                <div className="overflow-x-auto rounded-lg p-10">
                    <div className="border bg-white rounded py-5 px-5 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center print:mb-4">
                            DOCTOR REGISTRATION
                        </h1>
                        
                        {/* Doctor Information Section */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                        Doctor Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="doctorName"
                                        value={doctorInfo.doctorName}
                                        onChange={handleInputChange}
                                        placeholder="Enter doctor name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                        Department <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="department"
                                        value={doctorInfo.department}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="PSYCHIATRY">PSYCHIATRY</option>
                                        <option value="MEDICINE">MEDICINE</option>
                                        <option value="SURGERY">SURGERY</option>
                                        <option value="GYNAECOLOGY">GYNAECOLOGY</option>
                                        <option value="ORTHOPEDIC">ORTHOPEDIC</option>
                                        <option value="E. N. T/OPD">E. N. T/OPD</option>
                                        <option value="OPREATION THEATER">OPERATION THEATER</option>
                                        <option value="EMERGENCY">EMERGENCY</option>
                                        <option value="EYE">EYE</option>
                                        <option value="MEDICAL OFFICE">MEDICAL OFFICE</option>
                                        <option value="SENIOR MEDICAL OFFICE">SENIOR MEDICAL OFFICE</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                        Address
                                    </label>
                                    <input
                                        className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="address"
                                        value={doctorInfo.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                        Residence Ph
                                    </label>
                                    <input
                                        className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="residencePhone"
                                        value={doctorInfo.residencePhone}
                                        onChange={handleInputChange}
                                        placeholder="Enter residence phone"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                        Mobile <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="mobile"
                                        value={doctorInfo.mobile}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 0333-5021955"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 print:text-black mb-1">
                                    Surgeon / Anesthetist
                                </label>
                                <div className="flex items-center space-x-4">
                                    <select
                                        className="w-1/2 px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base print:bg-transparent print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 border-gray-300"
                                        name="surgeonType"
                                        value={doctorInfo.surgeonType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Surgeon">Surgeon</option>
                                        <option value="Anesthetist">Anesthetist</option>
                                        <option value="Both">Both</option>
                                    </select>
                                    
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="isAnesthetist"
                                                checked={doctorInfo.isAnesthetist}
                                                onChange={handleInputChange}
                                                className="sr-only"
                                            />
                                            <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${doctorInfo.isAnesthetist ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${doctorInfo.isAnesthetist ? 'translate-x-5' : ''}`}></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Anesthetist</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <hr className="my-6 border-gray-300" />
                        
                        {/* OPD Services Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">OPD Services</h2>
                            
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Consultation</h3>
                                <div className="grid grid-cols-5 gap-2 mb-4">
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            value={newOpdService}
                                            onChange={(e) => setNewOpdService(e.target.value)}
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            placeholder="Enter OPD service"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            placeholder="Editable Followup Visit"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            name="opdCharges"
                                            value={doctorInfo.opdCharges}
                                            onChange={handleInputChange}
                                            placeholder="Enter charges"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <button
                                            onClick={handleAddOpdService}
                                            className="w-1/2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Add Service
                                        </button>
                                    </div>
                                </div>
                                
                                {doctorInfo.opdServices.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-600 mb-2">Added Services:</h4>
                                        <ul className="space-y-1">
                                            {doctorInfo.opdServices.map((service, index) => (
                                                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded">
                                                    <span className="text-sm">{service}</span>
                                                    <button
                                                        onClick={() => handleRemoveOpdService(index)}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <hr className="my-6 border-gray-300" />
                        
                        {/* InDoor Services Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">InDoor Services</h2>
                            
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Select InDoor Service</h3>
                                <div className="grid grid-cols-5 gap-2 mb-4">
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            value={newIndoorService}
                                            onChange={(e) => setNewIndoorService(e.target.value)}
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            placeholder="Enter InDoor service"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            placeholder="Editable"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <input
                                            className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                            name="indoorCharges"
                                            value={doctorInfo.indoorCharges}
                                            onChange={handleInputChange}
                                            placeholder="Enter charges"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <button
                                            onClick={handleAddIndoorService}
                                            className="w-1/2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Add Service
                                        </button>
                                    </div>
                                </div>
                                
                                {doctorInfo.indoorServices.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-600 mb-2">Added Services:</h4>
                                        <ul className="space-y-1">
                                            {doctorInfo.indoorServices.map((service, index) => (
                                                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded">
                                                    <span className="text-sm">{service}</span>
                                                    <button
                                                        onClick={() => handleRemoveIndoorService(index)}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">InDoor Charges</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
                                                placeholder="Editable"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id="percentage"
                                                        name="indoorShareType"
                                                        value="percentage"
                                                        checked={doctorInfo.indoorShareType === "percentage"}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600"
                                                    />
                                                    <label htmlFor="percentage" className="text-sm">On %Age</label>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id="amount"
                                                        name="indoorShareType"
                                                        value="amount"
                                                        checked={doctorInfo.indoorShareType === "amount"}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600"
                                                    />
                                                    <label htmlFor="amount" className="text-sm">Amount Per Case</label>
                                                </div>
                                                
                                                <input
                                                    className="w-1/3 px-3 py-1 border rounded-lg text-gray-900 bg-[#edf9ff] text-sm sm:text-base border-gray-300"
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
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mb-8">
                            <button
                                onClick={handleNewDoctor}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                New
                            </button>
                            <button
                                onClick={handleSaveDoctor}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Print
                            </button>
                        </div>
                        
                        {/* Doctors List Table */}
                        <div className="border border-gray-300 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Doctors</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Sr.#</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">CONSULTANT</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">DEPARTMENT</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">PHONE</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">MOBILE</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctorsList.map((doctor, index) => (
                                            <tr key={doctor.id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b text-sm">{index + 1}</td>
                                                <td className="py-2 px-4 border-b text-sm font-medium">{doctor.consultant}</td>
                                                <td className="py-2 px-4 border-b text-sm">{doctor.department}</td>
                                                <td className="py-2 px-4 border-b text-sm">{doctor.phone || "-"}</td>
                                                <td className="py-2 px-4 border-b text-sm">{doctor.mobile || "-"}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <button
                                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorRegistration;