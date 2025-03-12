const normalizedExistingUser = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  email: user.email,
  birthDate: user.birthDate,
  gender: user.gender,
});

export default normalizedExistingUser;
