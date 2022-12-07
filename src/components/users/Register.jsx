import { USERS } from "/src/api/mock-data.jsx";
import { useState } from "react";
import User from "/src/components/users/User.jsx";
import RegistrationForm from "/src/components/users/RegistrationForm.jsx";
// import { updateToDateObject } from "/src/components/appointments/AppointmentList.jsx";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";


const updateToDateObject = (list, ...dateProps) => {
  return list.map((entry) => {
    for (const prop of dateProps) {
      entry[prop] = new Date(entry[prop]);
    }
    return entry;
  });
};
export default function Register() {
  const { theme, oppositeTheme } = useThemeColors();
  const [users, setUsers] = useState(USERS);
  console.log(...users);

  updateToDateObject(users, "birthdate");

  const createAccount = (
    firstName,
    lastName,
    birthdate,
    email,
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
        credits: 0,
      },
    ];

    setUsers(newUsers);
    console.log(...newUsers);
    // console.log("newUsers", JSON.stringify(users));
    // console.log("newUsers", JSON.stringify(newUsers));
  };
  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="text-center pt-5">Registration</h1>

      <div className="d-flex flex-row justify-content-center">
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
    </div>
  );
}
