import React from "react";
import SearchIcon from "../../../Components/Icons/SearchIcon";
import AsendingOrder from "../../../Components/Icons/AsendingOrder";
import DescendingOrder from "../../../Components/Icons/DescendingOrder";
function SearchControl({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
}) {
    return (
        <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search files and folders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex items-center space-x-2">
                <select
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                </select>
                <button
                    onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="p-2 border rounded-lg hover:bg-gray-100"
                >
                    {sortOrder === "asc" ? (
                        <AsendingOrder />
                    ) : (
                        <DescendingOrder />
                    )}
                </button>
            </div>
        </div>
    );
}

export default SearchControl;
