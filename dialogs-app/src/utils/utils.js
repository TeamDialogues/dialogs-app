export const isValidEmail = (email) => {
  const emailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = new RegExp("[0-9]+");
  return password.length > 6 && passwordRegex.test(password);
  // return false
};
