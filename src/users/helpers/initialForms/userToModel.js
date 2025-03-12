const userToModel = (UserData) => {
  return {
    firstName: UserData.firstName,
    lastName: UserData.lastName,
    email: UserData.email,
    phone: UserData.phone,
    birthDate: UserData.birthDate,
    gender: UserData.gender,
  };
};

export default userToModel;
