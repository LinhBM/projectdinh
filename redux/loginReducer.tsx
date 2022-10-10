import axios from "axios";

export const getUsers = async () => {
  try {
    const response = await axios.get(
      "http://192.168.1.22:8788/v5/users/login"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};