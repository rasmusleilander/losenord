import React from "react";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-[#18352c] py-6 text-center">
            <a href="/">
                <img
                    src="/assets/evolvit-logo.png"
                    alt="Evolvit Logo"
                    className="h-14 mx-auto"
                />
            </a>
        </header>
    );
};

export default Header;
