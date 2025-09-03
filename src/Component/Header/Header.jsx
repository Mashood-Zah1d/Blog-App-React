import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "./Logout";

function Header() {
  const authStatus = useSelector((state) => state.auth.authstatus);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Sign Up", slug: "/sign-up", active: !authStatus },
    { name: "All Posts", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3 
                  bg-white/10 backdrop-blur-xl border-b border-white/20 rounded-b-2xl 
                  shadow-md">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
        >
          Cartinix
        </h1>

        <ul className="flex space-x-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>


                    `relative text-sm font-medium 
                   dark:text-white
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500
                 after:w-0 after:transition-all after:duration-300 
                 hover:after:w-full hover:bg-gray-200 rounded-xl px-4 py-2
                ${isActive ? "text-orange-400" : "text-gray-800"}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>

        {authStatus && (
          <div>
            <Logout className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 
                           text-white font-semibold shadow hover:opacity-90 transition" />
          </div>
        )}
      </nav>
    </header>


  );
}

export default Header;
