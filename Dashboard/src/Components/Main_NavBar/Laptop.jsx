import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import { GoHome } from "react-icons/go";
import { PiListFill } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import LaptopNavItem from "./laptop_nav_item";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { MdContacts } from "react-icons/md";

function Laptop() {
    const Navigate = useNavigate();
    const { set_Auth } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        try {
            // Send a request to the logout endpoint on the server
            const response = await axios.post(
                "http://localhost:3000/logout",
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 204) {
                set_Auth(false);
                Swal.fire("Success!", `Logged Out Successfully`, "success");
                Navigate("/Login");
            } else {
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div className="flex flex-col gap-4 text-sm text-gray_v pl-8 py-4">
            <div className=" flex flex-col items-center justify-center text-gray_v">
                <img src={Logo} alt="Logo" className="w-16 " />
                {/* <div className="text-sm text-white font-semibold">Admin Panel</div> */}
            </div>
            <div className=" flex flex-col gap-2  mt-6  ">
                <LaptopNavItem
                    Link="Home"
                    name="Overview"
                    Active_nav={Active_nav}
                    Icon={GoHome}
                />
            </div>
            <div>
                <div className=" font-semibold pb-4  flex gap-2 items-center ">
                    <FaRegEdit className=" text-lg" />
                    Edit Content
                </div>{" "}
                <div className=" flex flex-col gap-1 pl-2  ">
                    <LaptopNavItem
                        Link="Edit_Main"
                        name="Main Section"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <LaptopNavItem
                        Link="Edit_About"
                        name="About Section"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <hr className=" my-2" />
                    <LaptopNavItem
                        Link="Call_Phrase"
                        name="Call Phrase"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <LaptopNavItem
                        Link="Description"
                        name="Description"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <LaptopNavItem
                        Link="Contact_Phrase"
                        name="Contact Phrase"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <hr className=" my-2" />
                    <LaptopNavItem
                        Link="Services"
                        name="Services Section"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                    <LaptopNavItem
                        Link="Faq"
                        name="FaQ Section"
                        Active_nav={Active_nav}
                        Icon={null}
                    />
                </div>
            </div>
            <div>
                <div className=" font-semibold   flex gap-2 items-center ">
                    <LaptopNavItem
                        Link="Demands"
                        name="Demands"
                        Active_nav={Active_nav}
                        Icon={MdOutlineWork}
                    />
                </div>{" "}
            </div>

            <div>
                <div className=" font-semibold   flex gap-2 items-center ">
                    <LaptopNavItem
                        Link="Contact"
                        name="Contact Messages"
                        Active_nav={Active_nav}
                        Icon={RiContactsLine}
                    />
                </div>{" "}
            </div>
            <div>
                <div className=" font-semibold pb-6   flex gap-2 items-center ">
                    <LaptopNavItem
                        Link="Contact_informations"
                        name="Contact Informations"
                        Active_nav={Active_nav}
                        Icon={MdContacts}
                    />
                </div>{" "}
            </div>
            <div className="pb-6">
                {LogoutClicked ? (
                    <div className="w-full ">
                        <span className="small-loader font-bold  w-full m-auto"></span>
                    </div>
                ) : (
                    <div
                        className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        <TbLogout2 className="  text-xl" />
                        Logout
                    </div>
                )}
            </div>
        </div>
    );
}

export default Laptop;
