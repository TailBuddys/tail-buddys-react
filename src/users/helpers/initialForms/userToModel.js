const userToModel = (UserData) => {
  return {
    FirstName: UserData.FirstName,
    LastName: UserData.LastName,
    email: UserData.email,
    phone: UserData.phone,
    birthDate: UserData.birthDate,
    gender: UserData.gender,
  };
};

export default userToModel;
