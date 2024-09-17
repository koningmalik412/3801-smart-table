import React from "react";
import { Link, useLocation } from 'react-router-dom';


function Header({ brandText, navLinks }) {
    const location = useLocation();

    return (
      <nav className="bg-gray rounded-[30px] border-[3px] border-brown px-0 py-4 mt-1 ml-auto w-full h-[100px]">
        <div className="flex justify-between items-center">
          <Link to="/add-event">
            <button
              type="button"
              className="text-brown bg-pink border-2 border-brown py-4 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full px-7 py-3 text-center ml-5 mb-2 font-montserrat font-bold"
            >
              Add an event 
            </button>
          </Link>
          <Link to="/" className={`text-3xl font-bold ${location.pathname === '/' ? 'text-brown text-outline' : 'text-brown'}`} data-text={brandText}>
            {brandText}
          </Link>
          <button 
            className="block lg:hidden text-brown focus:outline-none" 
            type="button" 
            aria-label="Toggle navigation"
            onClick={() => document.getElementById('navbarNav').classList.toggle('hidden')}
          >
            <span className="material-icons">menu</span>
          </button>
          <div className="hidden lg:flex lg:items-center lg:w-auto" id="navbarNav">
            <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-4 rounded transition ${
                      location.pathname === link.path
                        ? 'text-[#7B7E9D] text-3xl font-bold text-outline font-montserrat'
                        : 'text-brown text-xl font-bold font-montserrat'
                    }`} 
                    data-text={link.text}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Header;
