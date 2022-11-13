import axios from "axios";

const baseUrl = `http://localhost:9000/api/appointments`;


// export const getAll = async () => {
//   const response = await axios.get(baseUrl);
//   console.log(response);
// }

export const getAll = async () => {
  const {
    data
  } = await axios.get(baseUrl);
  console.log(data.appointments);
  return data.appointments;
}

export const deleteById = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export const save = async (appointment) => {
  await axios.post(baseUrl, appointment);
};