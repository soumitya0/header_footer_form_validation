import axios from "axios";

export const registerUser = (user) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts/", user);
};

export const loginUser = (user) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts/", user);
};
