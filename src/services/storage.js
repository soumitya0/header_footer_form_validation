export const setUserInStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromStorage = () => {
  return localStorage.getItem("user");
};

export const clearUserFromStorage = () => {
  localStorage.clear();
};
