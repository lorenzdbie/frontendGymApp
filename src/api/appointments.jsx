import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/appointments`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  // console.log(data.appointments);
  return data.appointments;
};
export const getById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  console.log(data);
  return data;
};

export const deleteById = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export const save = async (appointment) => {
  const { id, ...values } = appointment;

  await axios({
    method: id ? "PUT" : "POST",
    url: `${baseUrl}/${id ?? ""}`,
    data: values,
  });
};
