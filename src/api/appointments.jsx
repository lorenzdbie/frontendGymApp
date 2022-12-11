import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useMemo } from "react";

const baseUrl = `${import.meta.env.VITE_API_URL}/appointments`;

const useAppointments = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(`${baseUrl}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.appointments;
  }, [getAccessTokenSilently]);

  const getAllForUser = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    return data.appointments;
  }, [getAccessTokenSilently]);

  const getById = useCallback(
    async (id) => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      return data;
    },
    [getAccessTokenSilently]
  );

  const deleteById = useCallback(
    async (id) => {
      const token = await getAccessTokenSilently();
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const save = useCallback(
    async (appointment) => {
      const token = await getAccessTokenSilently();
      const { id, ...values } = appointment;

      await axios({
        method: id ? "PUT" : "POST",
        url: `${baseUrl}/${id ?? ""}`,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  const appointmentsApi = useMemo(
    () => ({
      getAll,
      getAllForUser,
      getById,
      deleteById,
      save,
    }),
    [getAll, getAllForUser, getById, deleteById, save]
  );

  return appointmentsApi;
};

export default useAppointments;
