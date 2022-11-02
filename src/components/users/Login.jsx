import { useState, useHistory } from "react";
import LoginForm from "./loginForm";
import { useThemeColors } from "../../contexts/Theme.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const { theme, oppositeTheme } = useThemeColors();

  const handleLogin = async (mail, pass) => {
    setEmail(mail);
    setPassword(pass);
  };

  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <div className="loginContainer">
        <LoginForm onSaveLogin={handleLogin} />
      </div>
    </div>
  );
}
