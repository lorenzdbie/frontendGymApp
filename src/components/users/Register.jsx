import { USERS } from "../../api/mock-data";
import { useState } from "react";
import User from "./User";
import RegistrationForm from "./RegistrationForm";

export default function Register() {
  const [users, setUsers] = useState(USERS);

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
        password,
        weight,
        height,
      },
    ];

    setUsers(newUsers);
  };
  return (
    <>
      <div className="col-sm-11">
        <RegistrationForm onSaveRegistration={createAccount} />
      </div>
      <div className="container">
        sorted by ID:
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
      </div>
    </>
  );
}
