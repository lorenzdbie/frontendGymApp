import { useThemeColors } from "../contexts/Theme.context";

export default function Navbar() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
    <div className={`nav bg-${theme} text-${oppositeTheme}`}>
      
      <ol>
        <li>Home</li>
        <li>Exercises</li>
        <li>Appointments</li>
        <li>Profile</li>
      </ol>
    </div>
  );
}
