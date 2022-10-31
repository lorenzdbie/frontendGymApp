import { useState, useHistory } from "react";
import LoginForm from "./loginForm";

export default function Login(){
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  
  const handleLogin = async (mail, pass) => {
    setEmail(mail);
    setPassword(pass);

  };
  
  return (
    <div className="loginContainer">
    <div className="formContainer">
      <LoginForm onSaveLogin={handleLogin}/>
    </div>
    </div>
  );
}                                