export const saveuserErrorHandler = (error) => {
  console.error("Error in saveuserErrorHandler:", error);

  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
};
