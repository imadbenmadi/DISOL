// Example usage (App.jsx or your page component)
import React from "react";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import DropdownItem from "./components/DropdownItem";
import { Home, Settings, User, LogOut, Bell, Search } from "lucide-react";

const App = () => {
    return (
        <div>
            <Navbar logo="/your-logo.svg">
                <NavItem label="Home" href="/" />
                <NavItem label="Products" href="/products" />

                <NavItem label="Services">
                    <DropdownItem
                        label="Consulting"
                        href="/services/consulting"
                    />
                    <DropdownItem
                        label="Development"
                        href="/services/development"
                    />
                    <DropdownItem label="Design" href="/services/design" />
                </NavItem>

                <NavItem label="Resources">
                    <DropdownItem
                        label="Documentation"
                        href="/resources/docs"
                        icon={<Search className="h-4 w-4" />}
                    />
                    <DropdownItem
                        label="Tutorials"
                        href="/resources/tutorials"
                        icon={<Bell className="h-4 w-4" />}
                    />
                </NavItem>

                <NavItem label="Account">
                    <DropdownItem
                        label="Profile"
                        href="/account/profile"
                        icon={<User className="h-4 w-4" />}
                    />
                    <DropdownItem
                        label="Settings"
                        href="/account/settings"
                        icon={<Settings className="h-4 w-4" />}
                    />
                    <DropdownItem
                        label="Logout"
                        onClick={() => console.log("Logged out")}
                        icon={<LogOut className="h-4 w-4" />}
                    />
                </NavItem>
            </Navbar>

            {/* Your page content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold">Welcome to Your App</h1>
                <p>Your content goes here.</p>
            </div>
        </div>
    );
};

export default App;
