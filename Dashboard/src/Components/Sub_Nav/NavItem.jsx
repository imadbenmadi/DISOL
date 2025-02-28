// NavItem.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

const NavItem = ({ 
  label, 
  href = "#", 
  children, 
  className = "" 
}) => {
  const hasDropdown = children && React.Children.count(children) > 0;
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`relative ${className}`}>
      {hasDropdown ? (
        <button 
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {label}
          <ChevronDown 
            className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      ) : (
        <a 
          href={href}
          className="block px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          {label}
        </a>
      )}
      
      {hasDropdown && isOpen && (
        <div className="absolute z-10 w-48 py-1 mt-1 bg-white rounded-md shadow-lg">
          {children}
        </div>
      )}
    </li>
  );
};

export default NavItem;