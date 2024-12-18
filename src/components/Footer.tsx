import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#18352c] py-4 text-center">
            <p className="text-gray-300 text-base">
                © {new Date().getFullYear()} Evolvit Solutions AB
            </p>
        </footer>
    );
};

export default Footer;
