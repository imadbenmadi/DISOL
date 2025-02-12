import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Logo from "../public/Logo/Logo.jpg";
import { useAppContext } from "./AppContext";
import NavBar from "./Components/Main_NavBar/NavBar";
function App() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const [userType, setUserType] = useState(null);
    const { set_Auth, store_login } = useAppContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Check_Auth",
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    if (!response.data.userType || !response.data.userId) {
                        set_Auth(false);
                        return;
                    }
                    set_Auth(true);
                    store_login(response.data.userId, response.data.userType);
                } else {
                    set_Auth(false);
                }
            } catch (error) {
                set_Auth(false);
            }
        };

        const fetch_fonts = () => {
            return new Promise((resolve) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap";
                const link = document.createElement("link");
                link.href = fontURL;
                link.rel = "stylesheet";
                link.onload = () => {
                    document.getElementById("root").style.fontFamily =
                        "Poppins, sans-serif";
                    resolve();
                };
                link.onerror = () => {
                    document.getElementById("root").style.fontFamily =
                        "sans-serif";
                    resolve();
                };
                document.head.appendChild(link);
            });
        };

        let intervalId; // Store interval ID

        Promise.all([fetch_fonts(), fetchData()])
            .then(() => {
                setLoading(false);
            })
            .then(() => {
                intervalId = setInterval(() => {
                    fetchData();
                }, 60000);
            })
            .catch(() => {
                setLoading(false);
            });
        // Clear interval on unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden flex items-start justify-start  ">
                <div className="  h-screen overflow-y-auto custom-overflow shrink-0 ">
                    <NavBar />
                </div>
                <div className=" pt-[60px] md:pt-0 w-screen md:w-[calc(100vw-210px)] h-screen overflow-y-auto custom-overflow">
                    <Outlet />
                </div>
            </div>
        );
}

export default App;
