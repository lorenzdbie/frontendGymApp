import { useState } from "react";


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
      <div className="d-flex flex-row justify-content-center mb-3">
        <picture>
          <img src="/src/assets/LogoSmall.webp" alt="logo loginScreen" />
        </picture>
      </div>
      <h2 className="text-center">Login / SignUp</h2>
      <div className="d-flex flex-row justify-content-center align-items-start">
        <form onSubmit={handleSubmit} className="w-50 mb-3 mx-auto">
          <div className="mb-" id="login">
            <label htmlFor="e-mail" className="form-label ">
              E-mail:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="form-control rounded-5"
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
              className="form-control rounded-5"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="clearfix">
            <div className="btn-group float-start">
              <button
                type="submit"
                className="btn btn-primary rounded-5"
                style={{ margin: "0 auto", backgroundColor: "blue" }}
              >
                Login
              </button>
            </div>
            <div className="btn-group float-end">
              <button
                type="button"
                onClick=""
                className="btn btn-primary rounded-5"
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
