import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import the Link component and rename it to avoid conflicts
import { useEffect } from "react";
function LaptopNavItem({ Link, name, Active_nav, Icon }) {
    const Last_item_in_link = Link.split("/").pop();
    return (
        <RouterLink
            to={Link}
            className={`${
                Active_nav == Last_item_in_link
                    ? "bg-blue_v text-white px-4"
                    : "bg-white hover:text-blue_v text-gray_v"
            } transition-all duration-150 flex gap-2 cursor-pointer py-1 select-none w-[150px] rounded-full`}
        >
            {Icon && <Icon className="text-lg" />} {name}
        </RouterLink>
    );
}

export default LaptopNavItem;
