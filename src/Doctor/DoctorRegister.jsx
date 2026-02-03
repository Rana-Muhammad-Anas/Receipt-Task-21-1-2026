import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
// import axiosInstance from "../../api/axiosConfig";
import DateTime from "../Components/DateTime";

// Modern Input Field Component
const InputField = ({ 
  label, 
  name, 
  register, 
  errors, 
  required, 
  placeholder, 
  type = "text", 
  className = "", 
  icon, 
  validation = {},
  ...props 
}) => (
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
        className={`w-full px-3 py-2 ${icon ? 'pl-10' : 'pl-3'} border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        } ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...validation
        })}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
    {errors?.[name] && (
      <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
    )}
  </div>
);

// Modern Select Field Component
const SelectField = ({ 
  label, 
  name, 
  register, 
  errors, 
  required, 
  options, 
  placeholder, 
  className = "", 
  icon,
  validation = {}
}) => (
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
        className={`w-full px-3 py-2 ${icon ? 'pl-10' : 'pl-3'} border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...validation
        })}
      >
        <option value="">{placeholder || "Select..."}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {errors?.[name] && (
      <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
    )}
  </div>
);

// Modern Toggle Switch Component
const ToggleSwitch = ({ label, name, register, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          {...register(name)}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300" />
        <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-6" />
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
    </label>
  </div>
);

// Toggle Checkbox Component
const ToggleCheckbox = ({ label, name, register, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          {...register(name)}
          className="sr-only peer"
        />
        <div className="w-10 h-5 flex items-center rounded-full p-1 bg-gray-300 peer-checked:bg-blue-600 transition-colors duration-300">
          <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5" />
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  </div>
);

// Charges Configuration Component
const ChargesConfiguration = ({
  shareCat,
  register,
  watch,
  shareTypeName,
  shareValueName,
  amountEditableName,
  className = ""
}) => {
  const shareType = watch(shareTypeName);

  return (
    <div className={`rounded-lg ${className}`}>
      <h4 className="text-sm font-medium text-gray-700">{shareCat} Services Share</h4>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id={`${shareTypeName}-percentage`}
              value="percentage"
              {...register(shareTypeName)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`${shareTypeName}-percentage`} className="ml-2 text-sm text-gray-700">
              In %Age
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id={`${shareTypeName}-amount`}
              value="amount"
              {...register(shareTypeName)}
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
              {...register(shareValueName)}
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
        
        <div className="flex items-center">
          <ToggleCheckbox
            label="Amount Editable"
            name={amountEditableName}
            register={register}
          />
        </div>
      </div>
    </div>
  );
};

// Service Management Component
const ServiceManagement = ({
  title,
  fields,
  append,
  remove,
  register,
  watch,
  errors,
  serviceType = "opd",
  chargesName,
  shareTypeName,
  shareValueName,
  amountEditableName,
}) => {
  const [newServiceName, setNewServiceName] = useState("");
  const charges = watch(chargesName);
  const shareType = watch(shareTypeName);
  const shareValue = watch(shareValueName);

  const handleAddService = () => {
    if (newServiceName.trim()) {
      append({
        name: newServiceName.trim(),
        charges: charges || "",
        type: serviceType === "opd" ? "OPD" : "Indoor",
        shareType: shareType,
        shareValue: shareValue,
      });
      setNewServiceName("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{title} Services</h2>
        <div className="text-sm text-gray-600">
          {fields.length} service{fields.length !== 1 ? 's' : ''} added
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-2">
        <div className="lg:col-span-2">
          <input
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            placeholder={`Enter ${serviceType} service name`}
            className="w-full px-3 py-2 pl-10 border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" style={{ marginTop: '-12px' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="col-span-2">
          <InputField
            name={chargesName}
            register={register}
            errors={errors}
            placeholder="Enter charges"
            type="number"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleAddService}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>

      <ChargesConfiguration
        shareCat={title}
        register={register}
        watch={watch}
        shareTypeName={shareTypeName}
        shareValueName={shareValueName}
        amountEditableName={amountEditableName}
      />
    </div>
  );
};

// Services Table Component
const ServicesTable = ({ opdFields, indoorFields, opdRemove, indoorRemove }) => {
  const allServices = [
    ...opdFields.map((service, index) => ({
      ...service,
      originalType: "opd",
      originalIndex: index
    })),
    ...indoorFields.map((service, index) => ({
      ...service,
      originalType: "indoor",
      originalIndex: index
    }))
  ];

  const getShareDisplay = (service) => {
    if (service.shareType === "percentage") {
      return `${service.shareValue || 0}%`;
    } else if (service.shareType === "amount") {
      return `Rs. ${service.shareValue || 0}`;
    }
    return "N/A";
  };

  const handleRemove = (originalType, originalIndex) => {
    if (originalType === "opd") {
      opdRemove(originalIndex);
    } else {
      indoorRemove(originalIndex);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-h-[430px] min-h-[430px] overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Added Services</h2>
        <div className="text-sm text-gray-600">
          Total: {allServices.length} service{allServices.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sr.#</th>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Share</th>
              <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allServices.map((service, index) => (
              <tr key={`${service.originalType}-${service.originalIndex}`} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-2 py-1 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {index + 1}
                  </span>
                </td>
                <td className="px-2 py-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    service.type === "OPD" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                  }`}>
                    {service.type}
                  </span>
                </td>
                <td className="px-2 py-1">
                  <div className="text-sm font-semibold text-gray-900">{service.name}</div>
                </td>
                <td className="px-2 py-1">
                  <div className="text-sm font-medium text-gray-900">
                    {service.charges ? `Rs. ${service.charges}` : "N/A"}
                  </div>
                </td>
                <td className="px-2 py-1">
                  <div className="text-sm font-medium text-gray-900">
                    {getShareDisplay(service)}
                  </div>
                </td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    onClick={() => handleRemove(service.originalType, service.originalIndex)}
                    className="inline-flex items-center px-2 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allServices.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No services added yet</h3>
        </div>
      )}
    </div>
  );
};

// Doctors Table Component
const DoctorsTable = ({ doctors, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Registered Doctors</h2>
        <div className="text-sm text-gray-600">
          Total: {doctors.length} doctor{doctors.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="overflow-x-auto max-h-[50vh] overflow-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sr.#</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CONSULTANT</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">DEPARTMENT</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">PHONE</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">MOBILE</th>
              <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor, index) => (
              <tr key={doctor.id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-2 py-2 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {index + 1}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <div className="text-sm font-semibold text-gray-900">{doctor.doctorName}</div>
                </td>
                <td className="px-2 py-2 hidden md:table-cell">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {doctor.department}
                  </span>
                </td>
                <td className="px-2 py-2 hidden lg:table-cell">
                  <div className="text-sm text-gray-700">
                    {doctor.residencePhone || <span className="text-gray-400 italic">Not provided</span>}
                  </div>
                </td>
                <td className="px-2 py-2">
                  <div className="text-sm font-medium text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {doctor.mobile || <span className="text-gray-400 italic">Not provided</span>}
                  </div>
                </td>
                <td className="px-2 py-2">
                  <button
                    type="button"
                    onClick={() => onDelete(doctor.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No doctors registered yet</h3>
          <p className="mt-1 text-sm text-gray-500">Add your first doctor using the form above.</p>
        </div>
      )}
    </div>
  );
};

// Action Buttons Component
const ActionButtons = ({ onReset, isSubmitting }) => (
  <div className="flex flex-col sm:flex-row justify-end gap-3 mb-8">
    <button
      type="button"
      onClick={onReset}
      className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      New Doctor
    </button>
    <button
      type="button"
      onClick={() => window.print()}
      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      {isSubmitting ? "Saving..." : "Save Doctor"}
    </button>
  </div>
);

// Main Component
function DoctorRegistration() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      opdAmountEditable: false,
      indoorAmountEditable: false,
    },
  });

  // Field arrays for services
  const {
    fields: opdFields,
    append: opdAppend,
    remove: opdRemove,
  } = useFieldArray({
    control,
    name: "opdServices",
  });

  const {
    fields: indoorFields,
    append: indoorAppend,
    remove: indoorRemove,
  } = useFieldArray({
    control,
    name: "indoorServices",
  });

  // Show notification
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slideIn`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove('animate-slideIn');
      notification.classList.add('animate-slideOut');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Prepare data for backend
    const doctorData = {
      doctorName: data.doctorName,
      department: data.department,
      address: data.address,
      residencePhone: data.residencePhone,
      mobile: data.mobile,
      surgeonType: data.surgeonType,
      isAnesthetist: data.isAnesthetist,
      isSurgeon: data.isSurgeon,
      isActiveForIndoor: data.isActiveForIndoor,
      isActiveForOPD: data.isActiveForOPD,
      opdServices: data.opdServices,
      opdCharges: data.opdCharges,
      indoorServices: data.indoorServices,
      indoorCharges: data.indoorCharges,
      indoorShareType: data.indoorShareType,
      indoorShareValue: data.indoorShareValue,
      opdShareType: data.opdShareType,
      opdShareValue: data.opdShareValue,
      opdAmountEditable: data.opdAmountEditable,
      indoorAmountEditable: data.indoorAmountEditable,
    };

    setIsSubmitting(true);

    try {
      // Send data to backend
      // const response = await axiosInstance.post("/doctors/register", doctorData);

      if (response.status === 200 || response.status === 201) {
        // Add to local list with response ID
        const newDoctor = {
          id: response.data.doctor_id || Date.now(),
          ...doctorData,
        };

        setDoctorsList((prev) => [...prev, newDoctor]);
        
        // Reset form
        reset();
        
        showNotification('Doctor saved successfully!', 'success');
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      showNotification(
        error.response?.data?.message || 'Failed to save doctor. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        // Call backend to delete
        // await axiosInstance.delete(`/doctors/${id}`);
        
        // Update local state
        setDoctorsList((prev) => prev.filter((doctor) => doctor.id !== id));
        showNotification('Doctor deleted successfully!', 'success');
      } catch (error) {
        console.error("Error deleting doctor:", error);
        showNotification('Failed to delete doctor. Please try again.', 'error');
      }
    }
  };

  const handleReset = () => {
    reset();
    showNotification('Form reset successfully!', 'success');
  };

  // Add CSS animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .animate-slideIn { animation: slideIn 0.3s ease-out; }
      .animate-slideOut { animation: slideOut 0.3s ease-in; }
      @media print {
        body * { visibility: hidden; }
        .print-area, .print-area * { visibility: visible; }
        .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        button { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Doctor Information Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 sm:border-l-8 border-blue-600">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  register={register}
                  errors={errors}
                  required
                  placeholder="Enter doctor's full name"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <SelectField
                  label="Department"
                  name="department"
                  register={register}
                  errors={errors}
                  required
                  options={departmentOptions}
                  placeholder="Select department"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="Address"
                  name="address"
                  register={register}
                  errors={errors}
                  placeholder="Enter hospital address"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />

                <InputField
                  label="Residence Phone"
                  name="residencePhone"
                  register={register}
                  errors={errors}
                  placeholder="Enter residence phone"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  register={register}
                  errors={errors}
                  required
                  placeholder="e.g., 0333-5021955"
                  validation={{
                    pattern: {
                      value: /^[0-9]{4}-[0-9]{7}$/,
                      message: "Mobile format: 0333-5021955"
                    }
                  }}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ToggleSwitch label="Surgeon" name="isSurgeon" register={register} />
                <ToggleSwitch label="Anesthetist" name="isAnesthetist" register={register} />
                <ToggleSwitch label="Active for OPD" name="isActiveForOPD" register={register} />
                <ToggleSwitch label="Active for Indoor" name="isActiveForIndoor" register={register} />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              {/* OPD Services */}
              <ServiceManagement
                title="OPD"
                fields={opdFields}
                append={opdAppend}
                remove={opdRemove}
                register={register}
                watch={watch}
                errors={errors}
                serviceType="opd"
                chargesName="opdCharges"
                shareTypeName="opdShareType"
                shareValueName="opdShareValue"
                amountEditableName="opdAmountEditable"
              />

              {/* Indoor Services */}
              <ServiceManagement
                title="Indoor"
                fields={indoorFields}
                append={indoorAppend}
                remove={indoorRemove}
                register={register}
                watch={watch}
                errors={errors}
                serviceType="indoor"
                chargesName="indoorCharges"
                shareTypeName="indoorShareType"
                shareValueName="indoorShareValue"
                amountEditableName="indoorAmountEditable"
              />
            </div>

            <div className="lg:col-span-2">
              <ServicesTable
                opdFields={opdFields}
                indoorFields={indoorFields}
                opdRemove={opdRemove}
                indoorRemove={indoorRemove}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons onReset={handleReset} isSubmitting={isSubmitting} />
        </form>

        {/* Doctors Table */}
        <div className="print-area">
          <DoctorsTable doctors={doctorsList} onDelete={handleDeleteDoctor} />
        </div>
      </div>
    </div>
  );
}

export default DoctorRegistration;