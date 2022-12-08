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

  // const registerWithAuth0 = useCallback(async (user) => {
  //   const signUpUser = {
  //     cient_id: `${import.meta.env.VITE_API_AUTH0_CLIENT_ID}`,
  //     email: user.email,
  //     password: user.password,
  //     connection: "Username-Password-Authentication",
  //     user_metadata: {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       birthdate: user.birthdate,
  //       weight: user.weight,
  //       height: user.height,
  //     },
  //   };
  //   await axios.post(
  //     `https://${import.meta.env.VITE_API_AUTH0_DOMAIN}/dbconnections/signup`,
  //     { data: signUpUser }
  //   );
  // });

  const getUserByAuthId = useCallback(
    async () => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${baseUrl}/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      return data;
    },
    [getAccessTokenSilently]
  );

  const register = useCallback(
    async (user) => {
      const token = await getAccessTokenSilently();
      const { id, ...values } = user;
      console.log(user);
      const { data } = await axios({
        method: id ? "PUT" : "POST",
        url: `${baseUrl}/${id ?? "register"}`,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return data;
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
