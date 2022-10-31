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
    <div className="d-flex flex-column col-12">
      <h2>Register account:</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-3 justify-content-md-center formContainer"
        // style={{ maxWidth: "90%", minWidth: "500px" }}
      >
        <div className="d-flex flex-row my-2">
          <label htmlFor="firstName" className="form-label col-5 my-auto ">
            First name:
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            className="form-control col rounded-5"
            placeholder="first name"
            required
          />
        </div>
        <div className="d-flex flex-row my-2">
          <label htmlFor="lastName" className=" form-label col-5 my-auto ">
            Last name:
          </label>

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
            className="form-control col rounded-5 "
            placeholder="last name"
            required
          />
        </div>

        <div className="d-flex flex-row my-2">
          <label htmlFor="date" className="form-label col-5 my-auto ">
            Birthdate:
          </label>

          <input
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            id="birthdate"
            type="date"
            className="form-control col rounded-5"
          />
        </div>

        <div className="d-flex flex-row my-2">
          <label htmlFor="e-mail" className="form-label col-5 my-auto ">
            Enter e-mail:
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            className="form-control col rounded-5"
            placeholder="abc@123.com"
            required
          />
        </div>

        <div className="d-flex flex-row my-2">
          <label htmlFor="password" className="form-label col-5 my-auto ">
          password:
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="form-control col rounded-5"
            placeholder="password"
            required
          />
        </div>

        <div className="d-flex flex-row my-2">
          <label htmlFor="password2" className="form-label col-5 my-0 ">
            Repeat password:
          </label>

          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            id="password2"
            type="password"
            className="form-control col rounded-5 my-auto"
            placeholder="password"
            required
          />
        </div>

        <div className="d-flex flex-row my-2">
          <label htmlFor="weight" className="form-label col-5 my-auto ">
            Body weight:
          </label>

          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            id="weight"
            type="number"
            step="0.1"
            className="form-control col bodyHW rounded-5"
            placeholder="weight"
          />
          <span className="my-auto form-label"> &nbsp;kg</span>
        </div>
        <div className="d-flex flex-row my-2">
          <label htmlFor="weight" className="form-label col-5 my-auto ">
            Body height:
          </label>
        
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              id="height"
              type="number"
              step="0.1"
              className="form-control col rounded-5"
              placeholder="height"
            />
          <span className="my-auto form-label"> &nbsp;m</span>
        </div>
        <div className="d-flex flex-row my-2">
          <input type="checkbox" className="form-check-label col-3 my-auto rounded-2" required />
          &ensp;&nbsp;I have read and agree to the terms and conditions
        </div>
        <div className="clearfix">
          <div className="btn-group float-end">
            <button
              className="btn btn-primary rounded-5"
              style={{ margin: "0 20px", backgroundColor: "gray" }}
            >
              Cancel
            </button>
          </div>
          <div className="btn-group float-end">
            <button
              type="submit"
              className="btn btn-primary rounded-5"
              style={{ margin: "0 20px", backgroundColor: "blue" }}
            >
              Sign-up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
