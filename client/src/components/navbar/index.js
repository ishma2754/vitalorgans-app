import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [cookies, , removeCookie] = useCookies(null);
  const [showDetails, setShowDetails] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userDetailsRef = useRef(null);
  const menuRef = useRef(null);

  const userEmail = cookies.Email;
  const userRole = cookies.Role;

  const handleSignOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
      setShowDetails(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "";

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white sticky top-0 z-10">
      <div className="flex justify-between items-center h-16 px-4">
        <NavLink to={userRole === "admin" ? "/AdminPage" : "/"} className="flex items-center">
          <img src="/vo.png" alt="VitalOrgans" className="h-10" />
        </NavLink>
        <div className="flex items-center space-x-4">
          {userRole !== "admin" && (
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/Input" className="block py-2 px-4 rounded hover:bg-hoverButtonColor">
                Vitals
              </NavLink>
              <NavLink to="/ChartPage" className="block py-2 px-4 rounded hover:bg-hoverButtonColor">
                Charts
              </NavLink>
              <NavLink to="/ReportsPage" className="block py-2 px-4 rounded hover:bg-hoverButtonColor">
                Reports
              </NavLink>
            </div>
          )}
          <div className="relative ml-4" ref={userDetailsRef}>
            <div className="cursor-pointer bg-white text-RussianViolet w-10 h-10 flex items-center justify-center rounded-full" onClick={toggleDetails}>
              {firstLetter}
            </div>
            {showDetails && (
              <div className="absolute top-12 right-0 mt-2 w-48 bg-white text-black border-2 border-RussianViolet p-2 rounded shadow-lg">
                <p>Welcome {cookies.Email}</p>
                <button className="w-full bg-RussianViolet text-white py-2 mt-2 rounded hover:bg-hoverButtonColor" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
          {userRole !== "admin" && (
            <div className="md:hidden flex items-center cursor-pointer" onClick={toggleMenu} ref={menuRef}>
              <div className="flex flex-col items-center">
                <span className="block w-8 h-1 bg-white mb-1"></span>
                <span className="block w-8 h-1 bg-white mb-1"></span>
                <span className="block w-8 h-1 bg-white"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      {menuOpen && userRole !== "admin" && (
        <div ref={menuRef} className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-black flex flex-col items-center space-y-4 py-4">
          <NavLink to="/Input" className="block py-2 px-4 rounded hover:bg-hoverButtonColor" onClick={() => setMenuOpen(false)}>
            Vitals
          </NavLink>
          <NavLink to="/ChartPage" className="block py-2 px-4 rounded hover:bg-hoverButtonColor" onClick={() => setMenuOpen(false)}>
            Charts
          </NavLink>
          <NavLink to="/ReportsPage" className="block py-2 px-4 rounded hover:bg-hoverButtonColor" onClick={() => setMenuOpen(false)}>
            Reports
          </NavLink>
        </div>
      )}
    </nav>
  );
}
