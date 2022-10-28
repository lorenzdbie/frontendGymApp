import { useState } from "react";

export default function RegistrationForm({ onSaveRegistration }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRegistration(
      firstName,
      lastName,
      birthdate,
      email,
      password,
      weight,
      height
    );
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setEmail("");
    setPassword("");
    setWeight("");
    setHeight("");
  };

  return (
    <>
      <h2>Register account:</h2>
      <form
        onSubmit={handleSubmit}
        className="w-50 mb-3"
        style={{ minWidth: "200px" }}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Enter first name:
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            className="form-control"
            placeholder="first name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Enter last name:
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
            className="form-control"
            placeholder="last name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Enter birthdate:
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="e-mail" className="form-label">
            Enter e-mail:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            className="form-control"
            placehoder="e-mail"
            rerquired
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-Label">
            Enter password:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="form-control"
            placeholder="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-Label">
            Repeat password:
          </label>
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            id="password2"
            type="password"
            className="form-control"
            placeholder="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-Label">
            Enter Body weight:
          </label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            id="weight"
            type="number"
            step="0.1"
            className="form-control"
            placeholder="body weight"
            style={{ maxWidth: "150px" }}
          />
          <span>kg</span>
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-Label">
            Enter body height:
          </label>
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            id="height"
            type="number"
            step="0.1"
            className="form-control"
            placeholder="body height"
            style={{ maxWidth: "150px" }}
          />
          <span>m</span>
        </div>
        <div className="clearfix">
          <div className="btn-group float-start">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "0 20px", backgroundColor: "blue" }}
            >
              Sign-up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
