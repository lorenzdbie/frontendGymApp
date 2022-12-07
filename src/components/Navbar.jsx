import { useTheme, themes, useThemeColors } from "/src/contexts/Theme.context.jsx";
import { memo } from "react";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthenticationButton from "/src/components/authentication/AuthenticationButton.jsx";

const NavItem = ({ label, to }) => {
  const { oppositeTheme } = useThemeColors();

  return (
    <li className={`nav-item mx-2 text-${oppositeTheme}`}>
      <Link to={to} className={`nav-link active text-${oppositeTheme}`}>
        {label}
      </Link>
    </li>
  );
};

export default memo(function Navbar() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar navbar-${theme} navbar-expand-lg bg-${theme}`}>
      <div className="container-fluid ">
        <button
          className={`navbar-toggler color-${oppositeTheme}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className={`navbar-toggler-icon`}></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbar"
        >
          <div className="nav-item">
            <button
              type="button"
              onClick={toggleTheme}
              className={`bg-${theme} text-${oppositeTheme}`}
            >
              {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
            </button>
          </div>

          <ul className="navbar-nav ml-auto me-auto mb-lg-0">
            <NavItem label="Home" to="/" />
            {/* <NavItem label="Appointments" to="/appointments" /> */}
            {/* <NavItem label="Overview" to="/overview" />  */}
            <NavItem label="Exercises" to="/exercises" /> 
            <NavItem label="Users" to="/users" />
          </ul>
          <AuthenticationButton />
        </div>
      </div>
    </nav>
    
  );
});
