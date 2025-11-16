"use client";

export default function InputField({ label, name, type, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  );
}
