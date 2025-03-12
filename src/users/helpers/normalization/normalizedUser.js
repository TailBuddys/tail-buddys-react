const normalizeUser = (user) => ({
  FirstName: user.FirstName,
  LastName: user.LastName,
  phone: user.phone,
  email: user.email,
  passwordHash: user.password,
  birthDate: user.birthDate,
  gender: user.gender,
});

export default normalizeUser;
