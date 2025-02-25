import React, { useState } from "react";
import Logo from "../../public/Logo/Logo.jpg";

const SimpleComingSoonPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call to register email
        setTimeout(() => {
            setIsSubmitted(true);
            setEmail("");
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mx-auto">
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

                {/* Email signup form */}
                <div className="mb-8">
                    {isSubmitted ? (
                        <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
                            <p>Thank you! We'll notify you when we launch.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Notify Me
                                </button>
                            </div>
                        </form>
                    )}
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
