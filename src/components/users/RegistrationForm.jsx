import { useState } from "react";

export default function RegistrationForm({ onSaveRegistration }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const checkPassword = (pass, pass2) => {
    if (pass === pass2) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    if (checkPassword(password, password2)) {
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
      setPassword2("");
      setWeight("");
      setHeight("");
    }
  };

  return (
    <>
      <h2>Register account:</h2>
      <br />
      <form
        onSubmit={handleSubmit}
        className="w-60 mb-3"
        style={{ maxWidth: "90%", minWidth: "500px" }}
      >
        <div className="mb-3 form-group row">
          <label
            htmlFor="firstName"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter first name:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              type="text"
              className="form-control form-control-lg"
              placeholder="first name"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="lastName"
            className=" col-sm-5 col-form-label-lg form-label"
          >
            Enter last name:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              type="text"
              className="form-control form-control-lg"
              placeholder="last name"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="date"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter birthdate:
          </label>
          <div className="col-sm-5 mb-3">
            <input
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              id="birthdate"
              type="date"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="e-mail"
            className="col-sm-5 col-form-label-lg form-label"
          >
            Enter e-mail:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="form-control form-control-lg"
              placeholder="abc@123.com"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="password"
            className="col-sm-5 col-form-label-lg form-Label"
          >
            Enter password:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="password"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="password2"
            className="col-sm-5 col-form-label-lg form-Label"
          >
            Repeat password:
          </label>
          <div className="col-sm-6 mb-3">
            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              id="password2"
              type="password"
              className="form-control form-control-lg"
              placeholder="password"
              required
            />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label
            htmlFor="weight"
            className="col-sm-5 col-form-label-lg form-Label"
          >
            Enter Body weight:
          </label>
          <div className="col-sm-4 mb-3">
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              id="weight"
              type="number"
              step="0.1"
              className="form-control form-control-lg"
              placeholder="body weight"
            />
          </div>
          <span className="col-sm-1 col-form-label-lg"> kg</span>
        </div>
        <div className="mb-3 form-inline form-group row">
          <label
            htmlFor="weight"
            className="col-sm-5 col-form-label-lg form-Label"
          >
            Enter body height:
          </label>
          <div className="col-sm-4 mb-3">
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              id="height"
              type="number"
              step="0.1"
              className="form-control form-control-lg"
              placeholder="body height"
            />
          </div>
          <span className="col-sm-1 col-form-label-lg"> m</span>
        </div>
        <div className="mb-3 col-sm-10 form-check-label">
          <input type="checkbox" className="form-check-label" required/>
          &ensp;&nbsp;I have read and agree to the terms and conditions
        </div>
        <div className="clearfix">
        <div className="btn-group float-end">
            <button
              className="btn btn-primary"
              style={{ margin: "0 20px", backgroundColor: "gray" }}
            >
              Cancel
            </button>
          </div>
          <div className="btn-group float-end">
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
