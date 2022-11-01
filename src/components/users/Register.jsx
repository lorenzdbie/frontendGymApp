import { USERS } from "../../api/mock-data";
import { useState } from "react";
import User from "./User";
import RegistrationForm from "./RegistrationForm";
import { updateToDateObject } from "../appointments/appointmentList";

export default function Register() {
  const [users, setUsers] = useState(USERS);
  console.log(...users);

  updateToDateObject(users, "birthdate");

  const createAccount = (
    firstName,
    lastName,
    birthdate,
    email,
    password,
    weight,
    height
  ) => {
    const newUsers = [
      ...users,
      {
        id: Number(Math.max(...users.map((e) => e.id)) + 1),
        firstName,
        lastName,
        birthdate: new Date(birthdate),
        email,
        weight,
        height,
        credits:0,
        role: "user",
      },
    ];

    setUsers(newUsers);
    console.log(...newUsers);
    // console.log("newUsers", JSON.stringify(users));
    // console.log("newUsers", JSON.stringify(newUsers));
  };
  return (
    <>
      <h1 className="text-center pt-5">Registration</h1>

      <div className="formContainer2">
        <RegistrationForm onSaveRegistration={createAccount} />
      </div>

      {/* 
      sorted by ID:
      <div className="container">
        
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">birthdate</th>
              <th scope="col">weight</th>
              <th scope="col">height</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => a.id < b.id)
              .map((user) => (
                <User {...user} key={user.id} index={user.id} />
              ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
}
