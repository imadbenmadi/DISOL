import React from "react";
import { ChevronDown } from "lucide-react";

// Navbar.jsx

const Navbar = ({
    children,
    logo = null,
    className = "",
    mobileBreakpoint = "md",
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`bg-white shadow ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center h-16 mb-2">
                    {/* Desktop menu */}
                    <div
                        className={`hidden ${mobileBreakpoint}:flex items-center`}
                    >
                        <ul className="flex space-x-4">{children}</ul>
                    </div>

                    {/* Mobile menu button */}
                    <div
                        className={`flex items-center ${mobileBreakpoint}:hidden`}
                    >
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className={`${mobileBreakpoint}:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, {
                                className: "block",
                            })
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
