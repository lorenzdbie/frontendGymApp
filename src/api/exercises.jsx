import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/trainings`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  // console.log(data);
  return data.trainings;
};

export const deleteById = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export const save = async (training) => {
  const { id, ...values } = training;

  await axios({
    method: id ? "PUT" : "POST",
    url: `${baseUrl}/${id ?? ""}`,
    data: values,
  });
}