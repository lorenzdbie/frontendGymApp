import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useMemo } from "react";

const baseUrl = `${import.meta.env.VITE_API_URL}/trainings`;

const useExercises = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    return data.trainings;
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
    async (training) => {
      const token = await getAccessTokenSilently();
      // console.log(training);
      const { id, ...values } = training;

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
  const exerciseApi = useMemo(
    () => ({
      getAll,
      getById,
      deleteById,
      save,
    }),
    [getAll, getById, deleteById, save]
  );

  return exerciseApi;
};

export default useExercises;
