import { ThemeContext } from "../context/Theme.context"
import { useContext } from "react";



export default function Navbar(){

  const {theme} = useContext(ThemeContext);

  return(
    <>
    <div className={`nav bg-${theme}`}>
      <ol>
        <li>Home</li>
        <li>Exercises</li>
        <li>Appointments</li>
        <li>Profile</li>
      </ol>
    </div>
    </>
  )
}