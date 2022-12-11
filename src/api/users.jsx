import axios from "axios";
import { useCallback, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

const useUsers = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    return data.users;
  }, [getAccessTokenSilently]);


  const getUserByAuthId = useCallback(
    async () => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${baseUrl}/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    },
    [getAccessTokenSilently]
  );

  const register = useCallback(
    async (user) => {
      const token = await getAccessTokenSilently();
      const { id, ...values } = user;
      // console.log(user);
      const { data } = await axios({
        method: id ? "PUT" : "POST",
        url: `${baseUrl}/${id ?? "register"}`,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
    },
    [getAccessTokenSilently]
  );

  const usersApi = useMemo(
    () => ({
      getAll,
      register,
      getUserByAuthId,
    }),
    [getAll, register, getUserByAuthId]
  );

  return usersApi;
};

export default useUsers;
