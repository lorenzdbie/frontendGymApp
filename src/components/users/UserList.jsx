import { useState, useCallback, useEffect } from "react";
import { useThemeColors } from "../../contexts/Theme.context.jsx";
import useUsers from "../../api/users.jsx";
import Loader from "../Loader.jsx";
import Error from "../Error.jsx";
import User from "./User.jsx";

export default function UserList() {
  const { theme, oppositeTheme } = useThemeColors();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersApi = useUsers();

  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await usersApi.getAll();
      setUsers(fetchedUsers.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <div className={`fullscreen bg-${theme} text-${oppositeTheme}`}>
      <h1 className="pt-5 text-center">Users</h1>
      <div className="d-flex justify-content-center mx-3">
        <div className="overflow-auto">
          <Loader loading={loading} />
          <Error error={error} />
          <table className={`table table- table-${theme} table-striped w-auto`}>
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Id:
                </th>
                <th scope="col" className="text-center w-100 px-5">
                  Name:
                </th>
                <th scope="col" className="text-center">
                  Email:
                </th>
                <th scope="col" className="text-center">
                  Date of birth:
                </th>
                <th scope="col" className="text-center px-4">
                  weight:
                </th>
                <th scope="col" className="text-center px-4">
                  height:
                </th>
              </tr>
            </thead>
            {!loading && !error ? (
              <tbody>
                {users.map((user) => (
                  <User key={user.id} {...user} />
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </div>
  );
}
