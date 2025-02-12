import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo/Logo.jpg";
import { GoHome } from "react-icons/go";
import { PiListFill } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import LaptopNavItem from "./Item";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import Toogler from "./Toogler";
import Section from "./Section"; // Import the Section component

function Laptop() {
    const [open, set_open] = useState(true);
    function Toogle_Menu_Bar() {
        set_open(!open);
    }

    const Navigate = useNavigate();
    const { set_Auth } = useAppContext();
    // const [Active_nav, setActive_nav] = useState("Home_Overview");
    const [Active_nav, setActive_nav] = useState();
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/").pop());
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
                Navigate("/Login", { replace: true });
            } else {
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div
            className={`${open ? "w-[230px] " : "w-fit "}   text-sm text-gray_v 
                `}
        >
            <div className="flex flex-col  ">
                <div
                    className=" flex flex-col gap-6 items-center justify-center
                 text-gray_v px-6 py-2"
                >
                    <Toogler
                        open={open}
                        set_open={set_open}
                        Toogle_Menu_Bar={Toogle_Menu_Bar}
                    />
                    {open && (
                        <div className=" flex flex-col items-center justify-center gap-2">
                            <img src={Logo} alt="Logo" className="w-16 " />

                            <div className="text-sm  font-semibold">
                                Admin Panel
                            </div>
                        </div>
                    )}
                </div>
                {open && (
                    <div className="flex flex-col gap-4 pl-8 pb-4">
                        <div className="flex flex-col gap-5 mt-6">
                            <Section title="Main" Icon={GoHome}>
                                <div className="flex flex-col gap-1 pl-2">
                                    <LaptopNavItem
                                        Link="/Main/Home_Overview"
                                        name="Disol Home"
                                        Active_nav={Active_nav}
                                        Icon={null}
                                    />{" "}
                                    <LaptopNavItem
                                        Link="/Main/Files"
                                        name="Disol Files"
                                        Active_nav={Active_nav}
                                        Icon={null}
                                    />
                                </div>
                            </Section>
                            <Section title="Edit Content" Icon={FaRegEdit}>
                                <div className="flex flex-col gap-1 pl-2">
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
                                    <hr className="my-2" />
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
                                    <hr className="my-2" />
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
                            </Section>

                            <LaptopNavItem
                                Link="Demands"
                                name="Demands"
                                Active_nav={Active_nav}
                                Icon={MdOutlineWork}
                            />

                            <LaptopNavItem
                                Link="Contact"
                                name="Contact Messages"
                                Active_nav={Active_nav}
                                Icon={RiContactsLine}
                            />

                            <LaptopNavItem
                                Link="Contact_informations"
                                name="Contact Informations"
                                Active_nav={Active_nav}
                                Icon={MdContacts}
                            />

                            <div className="pb-6">
                                {LogoutClicked ? (
                                    <div className="w-full">
                                        <span className="small-loader font-bold w-full m-auto"></span>
                                    </div>
                                ) : (
                                    <div
                                        className="cursor-pointer w-full flex items-center gap-3 text-red-500"
                                        onClick={handleLogout}
                                    >
                                        <TbLogout2 className="text-xl" />
                                        Logout
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Laptop;
