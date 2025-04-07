const DogDataToModel = (DogData) => {
  return {
    name: DogData.name,
    description: DogData.description,
    type: DogData.type ?? "",
    size: DogData.size ?? "",
    gender: DogData.gender === null ? "" : DogData.gender ? 1 : 0, // 0  for male, 1 for female
    birthDate: DogData.birthDate,
    address: DogData.address,
    vaccinated: DogData.vaccinated ? 1 : 0, // 0  for no, 1 for yes
  };
};

export default DogDataToModel;
