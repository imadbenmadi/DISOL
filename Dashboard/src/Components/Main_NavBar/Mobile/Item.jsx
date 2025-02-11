import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import the Link component and rename it to avoid conflicts

function Item({ Link, name, Active_nav, Icon, onClick }) {
    return (
        <>
            <RouterLink
                to={Link}
                onClick={onClick}
                className={`${
                    Active_nav === Link
                        ? "bg-yallow_v text-white px-4"
                        : "bg-white hover:text-yallow_v text-gray_v"
                } transition-all duration-150 flex gap-2 items-center cursor-pointer py-1 select-none w-fit rounded-full`}
            >
                {Icon && <Icon className="text-lg" />} <span>{name}</span>
            </RouterLink>
        </>
    );
}

export default Item;
