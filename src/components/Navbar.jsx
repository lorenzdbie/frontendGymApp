// import { useThemeColors } from "../contexts/Themecontext";

export default function Navbar() {
  // const { theme, oppositeTheme } = useThemeColors();

  return (
    <>
      <div className="nav">
        <ol>
          <li>Home</li>
          <li>Exercises</li>
          <li>Appointments</li>
          <li>Profile</li>
        </ol>
      </div>
    </>
  );
}
