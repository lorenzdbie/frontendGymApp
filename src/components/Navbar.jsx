import { useTheme, themes, useThemeColors } from "../contexts/Theme.context";
import { memo } from "react";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";



const NavItem = ({ label, to }) => {
  const { oppositeTheme } = useThemeColors();

  return (
    <li className="nav-item">
      {/* <Link to={to} className={`nav-link active text-${oppositeTheme}`}> */}
        {label}
      {/* </Link> */}
    </li>
  );
};










export default memo(function Navbar() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar bg-${theme} text-${oppositeTheme}`}>
      <div className="d-flex">
        <button
          type="button"
          onClick={toggleTheme}
          className={`bg-${theme} text-${oppositeTheme}`}
        >
          {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
        </button>
      </div>
      <div id="navbar">
        <ol className="d-flex">
          <NavItem label="Exercises" to="/" />
          <NavItem label="Appointments" to="/appointments" />
          <NavItem label="profile" to="/profile" />
        </ol>
      </div>
    </nav>
  );
});



// export default memo(function NavBar() {
//   const { theme, toggleTheme } = useThemeColors();

//   return (
//     <nav className={`navbar navbar-expand-lg bg-${theme} mb-4`}>
//       <div className="container-fluid">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbar">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <NavItem label="Home" to="/" />
//             <NavItem label="Exercises" to="/exercises" />
//             <NavItem label="Appointments" to="/appointments" />
//             <NavItem label="Profile" to="/profile" />
//           </ul>
//           <div className="d-flex">
//             <button type="button" onClick={toggleTheme}>
//               {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// });
