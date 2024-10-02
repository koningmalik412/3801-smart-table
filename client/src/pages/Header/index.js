import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ navLinks }) {
  const location = useLocation();

  return (
    <div className="pl-[50px] pr-[50px] w-[820px] flex align-items-center justify-end"
    style={{ zIndex: 50, position: 'fixed', bottom: 30, right: 0 }} // Keep the header on top and fixed at the bottom-right corner
    >
      <nav className="bg-gray rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] px-0 py-4 mt-1 ml-auto w-full h-[100px] flex justify-center align-items-center">
        <div className="flex justify-between items-center">
          <div
            className="hidden lg:flex lg:items-center lg:w-auto"
            id="navbarNav"
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-4 rounded transition ${
                      location.pathname === link.path
                        ? "text-blue text-3xl font-bold text-outline font-montserrat"
                        : "text-brown text-xl font-bold font-montserrat"
                    }`}
                  >
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
