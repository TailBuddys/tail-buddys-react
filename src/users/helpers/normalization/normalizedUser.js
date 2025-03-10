const normalizeUser = (user) => ({
  FirstName: user.FirstName,
  LastName: user.LastName,
  phone: user.phone,
  email: user.email,
  password: user.password,
});

export default normalizeUser;
