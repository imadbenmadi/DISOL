import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function LaptopNavItem({ Link, name, Active_nav, Icon }) {
    const [isContained, setIsContained] = useState(false);
    const [Last_item_in_link, setLast_item_in_link] = useState(
        Link.split("/").pop()
    );

    // Ensure the effect runs whenever Active_nav or Last_item_in_link changes
    useEffect(() => {
        setLast_item_in_link(Link.split("/").pop());
        if (Array.isArray(Active_nav)) {
            const isContained = Active_nav.includes(Last_item_in_link);
            setIsContained(isContained);
        }
    }, [Active_nav, Last_item_in_link]); // Include Active_nav and Last_item_in_link as dependencies

    return (
        <RouterLink
            to={Link}
            className={`${
                isContained
                    ? "bg-blue_v text-white px-4"
                    : "bg-white hover:text-blue_v text-gray_v"
            } transition-all duration-150 flex gap-2 cursor-pointer py-1 select-none w-[150px] rounded-full`}
        >
            {Icon && <Icon className="text-lg" />} {name}
        </RouterLink>
    );
}

export default LaptopNavItem;
