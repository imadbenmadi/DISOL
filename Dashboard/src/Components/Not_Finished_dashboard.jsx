import React, { useState } from "react";
import Logo from "../../public/Logo/Logo.jpg";
const SimpleComingSoonPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mx-auto">
                {/* Logo placeholder - you can replace this with your actual logo */}
                <div className="flex justify-center mb-8">
                    <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                            <img src={Logo} alt="" />
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    We're Still Building
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Our team is working hard to bring you an exceptional
                    experience. Sign up to be notified when we launch!
                </p>

                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="text-right text-sm text-gray-600">
                        Almost there...
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm">
                    <p>© 2025 Disol. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default SimpleComingSoonPage;
