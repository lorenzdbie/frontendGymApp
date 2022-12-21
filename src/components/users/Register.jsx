import { memo } from "react";
import RegistrationForm from "/src/components/users/RegistrationForm.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";

// const updateToDateObject = (list, ...dateProps) => {
//   return list.map((entry) => {
//     for (const prop of dateProps) {
//       entry[prop] = new Date(entry[prop]);
//     }
//     return entry;
//   });
// };
export default memo(function Register() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="text-center pt-5">Registration</h1>
      <div className="d-flex flex-row justify-content-center">
        <RegistrationForm />
      </div>
    </div>
  );
});
