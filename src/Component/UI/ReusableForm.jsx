"use client";
import React from "react";

const ReusableForm = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  className = "",
  icon: Icon, 
}) => {
  const renderInput = () => {
    const inputBase =
      "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none";

    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`${inputBase} ${Icon ? "pl-10" : ""} ${className}`}
          />
        );

      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${inputBase} ${className}`}
          >
            <option value="">Select {label}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex gap-4">
            {options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  required={required}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <input
            id={name}
            name={name}
            type="file"
            onChange={onChange}
            required={required}
            className={`w-full cursor-pointer ${className}`}
          />
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type || "text"}
            placeholder={placeholder}
            value={type !== "file" ? value : undefined}
            onChange={onChange}
            required={required}
            className={`${inputBase} ${Icon ? "pl-10" : ""} ${className}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        )}
        {renderInput()}
      </div>
    </div>
  );
};

export default ReusableForm;
