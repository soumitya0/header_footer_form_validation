const register = [{ userName: "jhon", token: "qwerty", role: "admin" }];

export const checkIfUserExists = (user) => {
  const existingUser = register.find((registerUser) => {
    return registerUser.userName == user.userName;
  });

  return existingUser;
};

const resiterUser = (user) => {
  const newUser = {
    userName: user.userName,
    token: user.password,
    role: user.role,
  };

  register.push(newUser);
};

export const addUser = (user) => {
  const promises = new Promise((resolve, reject) => {
    if (checkIfUserExists(user)) {
      reject("User Already Exists");
    } else {
      resiterUser(user);
      resolve("User Added!");
    }
  });

  return promises;
};
