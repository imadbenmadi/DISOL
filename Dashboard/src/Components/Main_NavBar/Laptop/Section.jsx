import React, { useState } from "react";

function Section({ title, Icon, default_open, children }) {
    const [isOpen, setIsOpen] = useState(default_open);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                onClick={toggleSection}
                className="cursor-pointer font-semibold pb-4 flex gap-2 items-center"
            >
                <div className=" flex gap-2">
                    {Icon && <Icon className="text-lg" />}
                    {title}
                </div>

                <span
                    className={`transform transition-transform ${
                        isOpen ? "rotate-90" : "rotate-0"
                    }`}
                >
                    &#9654; {/* Right arrow icon */}
                </span>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default Section;
