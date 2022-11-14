import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  // console.log(data);
  return data.users;
}