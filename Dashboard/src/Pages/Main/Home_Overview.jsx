import React, { useState } from "react";

function Home_Overview() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading website...</span>
                </div>
            )}

            {/* Error State */}
            {hasError && (
                <div className="text-red-500 text-center">
                    Failed to load the website. Please try again later.
                </div>
            )}

            {/* Iframe */}
            <iframe
                src="https://disol-agency.com/"
                title="Website Overview"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                className={`w-full h-[80vh] border-none rounded-lg shadow-lg ${
                    isLoading || hasError ? "hidden" : "block"
                }`}
                sandbox="allow-scripts allow-same-origin allow-forms"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Home_Overview;
