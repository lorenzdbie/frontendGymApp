import { USERS } from "/src/api/mock-data.jsx";
import { useState } from "react";
import User from "/src/components/users/User.jsx";
import RegistrationForm from "/src/components/users/RegistrationForm.jsx";
// import { updateToDateObject } from "/src/components/appointments/AppointmentList.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";


const updateToDateObject = (list, ...dateProps) => {
  return list.map((entry) => {
    for (const prop of dateProps) {
      entry[prop] = new Date(entry[prop]);
    }
    return entry;
  });
};
export default function Register() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="text-center pt-5">Registration</h1>
      <div className="d-flex flex-row justify-content-center">
        <RegistrationForm />
      </div>
    </div>
  );
}
