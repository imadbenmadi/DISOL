// DropdownItem.jsx
import React from "react";

const DropdownItem = ({
    label,
    href = "#",
    icon = null,
    onClick = null,
    className = "",
}) => {
    return (
        <a
            href={onClick ? undefined : href}
            onClick={onClick}
            className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer ${className}`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </a>
    );
};

export default DropdownItem;
