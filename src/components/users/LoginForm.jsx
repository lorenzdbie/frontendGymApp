import { useState } from "react";
// import DinoLogo from "../../assets/Logodino.webp";
import LogoLarge from "../../assets/LogoLarge.webp";
import LogoMedium from "../../assets/LogoMedium.webp";
import LogoSmall from "../../assets/LogoSmall.webp";

export default function LoginForm({ onSaveLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <picture>
          <img src="/src/assets/LogoSmall.webp" alt="logo loginScreen" />
        </picture>
      </div>
      <h2>Login / SignUp</h2>
      <div className="d-flex flex-row justify-content-center">
        <form onSubmit={handleSubmit} className="w-50 mb-3 mx-auto">
          <br />
          <div className="mb-3" id="login">
            <label htmlFor="e-mail" className="form-label ">
              E-mail:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="form-control"
              placehoder="Enter e-mail"
              required
            />
          </div>
          <div className="mb-3" id="login">
            <label htmlFor="password" className="form-Label">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="clearfix">
            <div className="btn-group float-start">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ margin: "0 auto", backgroundColor: "blue" }}
              >
                Login
              </button>
            </div>
            <div className="btn-group float-end">
              <button
                type="button"
                onClick=""
                className="btn btn-primary"
                style={{ margin: "0 auto", backgroundColor: "red" }}
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
